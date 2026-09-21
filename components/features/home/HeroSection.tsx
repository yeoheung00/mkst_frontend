"use client";

import { useTheme } from "next-themes";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";

interface Color {
  r: number;
  g: number;
  b: number;
}

class Point {
  id: number;
  x: number;
  y: number;
  dir: number;
  color: Color | null;
  activeColor: Color | null;
  maxX: number;
  maxY: number;
  dpr: number;
  neighbors: Point[];

  constructor(
    id: number,
    x: number,
    y: number,
    dir: number,
    maxX: number,
    maxY: number,
    color: Color,
    activeColor: Color,
    dpr: number,
  ) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.color = color;
    this.activeColor = activeColor;
    this.maxX = maxX;
    this.maxY = maxY;
    this.dpr = dpr;
    this.neighbors = [];
  }
  setColor(color: Color, activeColor: Color) {
    this.color = color;
    this.activeColor = activeColor;
  }

  addNeighbor(neighbor: Point) {
    this.neighbors.push(neighbor);
  }

  resize(width: number, height: number) {
    this.x = (this.x / this.maxX) * width;
    this.y = (this.y / this.maxY) * height;
    this.maxX = width;
    this.maxY = height;
  }

  draw(ctx: CanvasRenderingContext2D, mx: number, my: number, delta: number) {
    if (!this.color || !this.activeColor) return;
    const distance = Math.sqrt((this.x - mx) ** 2 + (this.y - my) ** 2);
    const isEffective = distance < EFFECT_RADIUS * this.dpr;
    const effectRatio = isEffective ? 1 - distance / (EFFECT_RADIUS * this.dpr) : 0;
    const SIZE = ((MAX_SIZE - BASE_SIZE) * effectRatio + BASE_SIZE) * this.dpr;
    if (isEffective) {
      const r = (this.activeColor.r - this.color.r) * effectRatio + this.color.r;
      const g = (this.activeColor.g - this.color.g) * effectRatio + this.color.g;
      const b = (this.activeColor.b - this.color.b) * effectRatio + this.color.b;
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    } else {
      ctx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`;
    }
    ctx.beginPath();
    ctx.arc(this.x, this.y, SIZE, 0, 2 * Math.PI);
    ctx.fill();
    const angle = (this.dir * Math.PI) / 180;
    const dx = Math.cos(angle);
    const dy = Math.sin(angle);
    this.x += dx * SPEED * delta * this.dpr;
    this.y += dy * SPEED * delta * this.dpr;
    if (this.x < 0) this.x += this.maxX;
    if (this.x > this.maxX) this.x -= this.maxX;
    if (this.y < 0) this.y += this.maxY;
    if (this.y > this.maxY) this.y -= this.maxY;
    const randomDir = Math.random() * 20 - 10;
    this.dir += randomDir;
    if (this.dir < 0) this.dir = 360 + this.dir;
    if (this.dir >= 360) this.dir -= 360;
  }
}
class Edge {
  point1: Point;
  point2: Point;
  color: Color | null;
  opacity: number;
  activeColor: Color | null;
  dpr: number;

  constructor(
    point1: Point,
    point2: Point,
    color: Color,
    activeColor: Color | null,
    opacity: number,
    dpr: number,
  ) {
    this.point1 = point1;
    this.point2 = point2;
    this.color = color;
    this.opacity = opacity;
    this.activeColor = activeColor;
    this.dpr = dpr;
  }

  draw(ctx: CanvasRenderingContext2D, mx: number, my: number) {
    if (!this.color || !this.activeColor) return;
    const distanceP1 = Math.sqrt((this.point1.x - mx) ** 2 + (this.point1.y - my) ** 2);
    const distanceP2 = Math.sqrt((this.point2.x - mx) ** 2 + (this.point2.y - my) ** 2);
    const isEffective =
      distanceP1 < EFFECT_RADIUS * this.dpr || distanceP2 < EFFECT_RADIUS * this.dpr;
    const effectRatio = isEffective
      ? 1 - Math.min(distanceP1, distanceP2) / (EFFECT_RADIUS * this.dpr)
      : 0;
    const weight = ((MAX_WEIGHT - BASE_WEIGHT) * effectRatio + BASE_WEIGHT) * this.dpr;
    if (isEffective) {
      const r = (this.activeColor.r - this.color.r) * effectRatio + this.color.r;
      const g = (this.activeColor.g - this.color.g) * effectRatio + this.color.g;
      const b = (this.activeColor.b - this.color.b) * effectRatio + this.color.b;
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
    } else {
      ctx.strokeStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
    }
    ctx.lineWidth = weight;
    ctx.beginPath();
    ctx.moveTo(this.point1.x, this.point1.y);
    ctx.lineTo(this.point2.x, this.point2.y);
    ctx.stroke();
  }
}
class Face {
  points: Point[];
  color: Color | null;
  opacity: number;
  activeColor: Color | null;
  dpr: number;

  constructor(
    points: Point[],
    color: Color,
    activeColor: Color | null,
    opacity: number,
    dpr: number,
  ) {
    this.points = points;
    this.color = color;
    this.activeColor = activeColor;
    this.opacity = opacity;
    this.dpr = dpr;
  }

  draw(ctx: CanvasRenderingContext2D, mx: number, my: number) {
    if (!this.color || !this.activeColor) return;
    const distanceP1 = Math.hypot(mx - this.points[0].x, my - this.points[0].y);
    const distanceP2 = Math.hypot(mx - this.points[1].x, my - this.points[1].y);
    const distanceP3 = Math.hypot(mx - this.points[2].x, my - this.points[2].y);
    const isEffective =
      distanceP1 < EFFECT_RADIUS * this.dpr ||
      distanceP2 < EFFECT_RADIUS * this.dpr ||
      distanceP3 < EFFECT_RADIUS * this.dpr;
    const effectiveRatio = isEffective
      ? 1 - Math.min(distanceP1, distanceP2, distanceP3) / (EFFECT_RADIUS * this.dpr)
      : 0;
    if (isEffective) {
      const r = (this.activeColor.r - this.color.r) * effectiveRatio + this.color.r;
      const g = (this.activeColor.g - this.color.g) * effectiveRatio + this.color.g;
      const b = (this.activeColor.b - this.color.b) * effectiveRatio + this.color.b;
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
    } else {
      ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
    }
    ctx.beginPath();
    this.points.forEach((point) => {
      ctx.lineTo(point.x, point.y);
    });
    ctx.closePath();
    ctx.fill();
  }
}
const NEIGHBOR_RADIUS = 180;
const NEIGHBOR_LIMIT = 5;

const EFFECT_RADIUS = 180;

/* Point */
const BASE_SIZE = 3;
const MAX_SIZE = 8;
const SPEED = 5;

/* Edge */
const BASE_WEIGHT = 1;
const MAX_WEIGHT = 4;

const DURATION = 2;
const CIRCULAR_DELAY = 6000;
const CIRCULAR_STAY = 10000;

const BASE_PALETTE = {
  light: {
    point: { r: 203, g: 213, b: 225 },
    edge: { r: 226, g: 232, b: 240 },
    face: { r: 241, g: 245, b: 249 },
  },
  dark: {
    point: { r: 71, g: 85, b: 105 },
    edge: { r: 51, g: 65, b: 85 },
    face: { r: 30, g: 41, b: 59 },
  },
};
const ACTIVE_PALETTE = {
  light: {
    point: { r: 96, g: 165, b: 250 },
    edge: { r: 147, g: 197, b: 253 },
    face: { r: 191, g: 219, b: 254 },
  },
  dark: {
    point: { r: 59, g: 130, b: 246 },
    edge: { r: 37, g: 99, b: 235 },
    face: { r: 29, g: 78, b: 216 },
  },
};

export default function HeroSection() {
  const { resolvedTheme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentPalette = useRef(BASE_PALETTE["light"]);
  const currentActivePalette = useRef(ACTIVE_PALETTE["light"]);

  const points = useRef<Array<Point>>([]);
  const edges = useRef<Array<Edge>>([]);
  const faces = useRef<Array<Face>>([]);

  const mouseCoords = useRef<{ mx: number; my: number }>({ mx: 0, my: 0 });
  const [mode, setMode] = useState<"exp" | "code" | "record">("exp");
  const modeRef = useRef<"exp" | "code" | "record">("exp");
  const [isHovering, setIsHovering] = useState(false);
  const isHoveringRef = useRef(false);
  const expRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const recordRef = useRef<HTMLDivElement>(null);
  const edgeOpacity = useRef(1);
  const faceOpacity = useRef(1);
  const currentEdgeOpacity = useRef(1);
  const currentFaceOpacity = useRef(1);

  useEffect(() => {
    if (!expRef.current || !codeRef.current || !recordRef.current) return;
    expRef.current.addEventListener("mouseover", () => {
      setMode("exp");
      setIsHovering(true);
    });
    codeRef.current.addEventListener("mouseover", () => {
      setMode("code");
      setIsHovering(true);
    });
    recordRef.current.addEventListener("mouseover", () => {
      setMode("record");
      setIsHovering(true);
    });
    expRef.current.addEventListener("mouseout", () => {
      setIsHovering(false);
    });
    codeRef.current.addEventListener("mouseout", () => {
      setIsHovering(false);
    });
    recordRef.current.addEventListener("mouseout", () => {
      setIsHovering(false);
    });
  }, []);

  const circular = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    isHoveringRef.current = isHovering;
  }, [isHovering]);

  useEffect(() => {
    if (circular.current && isHoveringRef.current) {
      clearTimeout(circular.current);
      circular.current = null;
    }
    if (!isHoveringRef.current) {
      circular.current = setTimeout(() => {
        if (modeRef.current === "exp") {
          setMode("code");
        } else if (modeRef.current === "code") {
          setMode("record");
        } else {
          setMode("exp");
        }
      }, CIRCULAR_STAY);
    }
    return () => {
      if (circular.current) {
        clearTimeout(circular.current);
        circular.current = null;
      }
    };
  }, [isHovering]);

  useEffect(() => {
    if (mode === "exp") {
      edgeOpacity.current = 0;
      faceOpacity.current = 0;
      if (!isHoveringRef.current) {
        circular.current = setTimeout(() => {
          setMode("code");
        }, CIRCULAR_DELAY);
      }
    }
    if (mode === "code") {
      edgeOpacity.current = 1;
      faceOpacity.current = 0;
      if (!isHoveringRef.current) {
        circular.current = setTimeout(() => {
          setMode("record");
        }, CIRCULAR_DELAY);
      }
    }
    if (mode === "record") {
      edgeOpacity.current = 1;
      faceOpacity.current = 1;
      if (!isHoveringRef.current) {
        circular.current = setTimeout(() => {
          setMode("exp");
        }, CIRCULAR_DELAY);
      }
    }
    return () => {
      if (circular.current) {
        clearTimeout(circular.current);
        circular.current = null;
      }
    };
  }, [mode]);

  useEffect(() => {
    const dpr = window.devicePixelRatio;
    const canvas = canvasRef.current;
    if (!canvas) return;

    points.current = [];

    const resizeCanvas = () => {
      const width = window.innerWidth * dpr;
      const height = window.innerHeight * dpr;
      canvas.width = width;
      canvas.height = height;
      points.current.forEach((point) => point.resize(width, height));

      const POINT_COUNT = Math.floor((width * height) / 50000);
      if (points.current.length < POINT_COUNT) {
        for (let i = points.current.length; i < POINT_COUNT; i++) {
          const x = Math.random() * width;
          const y = Math.random() * height;
          points.current.push(
            new Point(
              i + points.current.length,
              x,
              y,
              0,
              width,
              height,
              currentPalette.current.point,
              currentActivePalette.current.point,
              dpr,
            ),
          );
        }
      } else if (points.current.length > POINT_COUNT) {
        points.current = points.current.slice(0, POINT_COUNT);
      }
    };

    resizeCanvas();

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const ccw = (a: Point, b: Point, c: Point) => {
      const result = (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
      if (result > 0) return 1;
      if (result < 0) return -1;
      return 0;
    };

    const isSamePoint = (a: Point, b: Point) => a.x === b.x && a.y === b.y;

    const isIntersecting = (a: Point, b: Point, c: Point, d: Point) => {
      if (
        isSamePoint(a, c) ||
        isSamePoint(a, d) ||
        isSamePoint(b, c) ||
        isSamePoint(b, d)
      ) {
        return false;
      }

      const ab = ccw(a, b, c) * ccw(a, b, d);
      const cd = ccw(c, d, a) * ccw(c, d, b);

      if (ab === 0 && cd === 0) {
        const isXOverlap =
          Math.min(a.x, b.x) <= Math.max(c.x, d.x) &&
          Math.min(c.x, d.x) <= Math.max(a.x, b.x);
        const isYOverlap =
          Math.min(a.y, b.y) <= Math.max(c.y, d.y) &&
          Math.min(c.y, d.y) <= Math.max(a.y, b.y);
        return isXOverlap && isYOverlap;
      }
      return ab <= 0 && cd <= 0;
    };

    const initialNeighbors = () => {
      points.current.forEach((p) => {
        p.neighbors = [];
      });
      edges.current = [];
      faces.current = [];
      for (const point of points.current) {
        for (const otherPoint of points.current) {
          if (point !== otherPoint) {
            if (
              point.neighbors.includes(otherPoint) ||
              point.neighbors.length >= NEIGHBOR_LIMIT ||
              otherPoint.neighbors.length >= NEIGHBOR_LIMIT
            ) {
              continue;
            }

            const distance = Math.hypot(point.x - otherPoint.x, point.y - otherPoint.y);
            if (distance < NEIGHBOR_RADIUS * dpr) {
              let isCrossed = false;
              for (const edge of edges.current) {
                if (isIntersecting(edge.point1, edge.point2, point, otherPoint)) {
                  isCrossed = true;
                  break;
                }
              }

              if (!isCrossed) {
                edges.current.push(
                  new Edge(
                    point,
                    otherPoint,
                    currentPalette.current.edge,
                    currentActivePalette.current.edge,
                    currentEdgeOpacity.current,
                    dpr,
                  ),
                );
                point.addNeighbor(otherPoint);
                otherPoint.addNeighbor(point);
              }
            }
          }
        }
      }

      points.current.forEach((p) => {
        p.neighbors.sort((a, b) => {
          const angleA = Math.atan2(a.y - p.y, a.x - p.x);
          const angleB = Math.atan2(b.y - p.y, b.x - p.x);
          return angleA - angleB;
        });
      });

      const faceSet = new Set();

      for (const p1 of points.current) {
        for (const p2 of p1.neighbors) {
          const p2Neighbors = p2.neighbors;
          const p1IdxInP2 = p2Neighbors.findIndex((n) => n.id === p1.id);
          const p3 = p2Neighbors[(p1IdxInP2 + 1) % p2Neighbors.length];

          if (p3 && p3.neighbors.some((n) => n.id === p1.id)) {
            const p3Neighbors = p3.neighbors;
            const p2IdxInP3 = p3Neighbors.findIndex((n) => n.id === p2.id);
            const nextFromP3 = p3Neighbors[(p2IdxInP3 + 1) % p3Neighbors.length];

            if (nextFromP3.id === p1.id) {
              const ids = [p1.id, p2.id, p3.id].sort((a, b) => a - b);
              const key = ids.join("-");

              if (!faceSet.has(key)) {
                faceSet.add(key);
                faces.current.push(
                  new Face(
                    [p1, p2, p3],
                    currentPalette.current.face,
                    currentActivePalette.current.face,
                    currentFaceOpacity.current,
                    dpr,
                  ),
                );
              }
            }
          }
        }
      }
    };
    let lastTime: number | null = null;
    const animate = (timestamp: number) => {
      if (lastTime === null) {
        lastTime = timestamp;
      }

      const delta = (timestamp - lastTime) / 1000;
      lastTime = timestamp;

      if (edgeOpacity.current === 0 && currentEdgeOpacity.current > 0) {
        currentEdgeOpacity.current -= DURATION * delta;
        if (currentEdgeOpacity.current < 0) currentEdgeOpacity.current = 0;
      } else if (edgeOpacity.current === 1 && currentEdgeOpacity.current < 1) {
        currentEdgeOpacity.current += DURATION * delta;
        if (currentEdgeOpacity.current > 1) currentEdgeOpacity.current = 1;
      }
      if (faceOpacity.current === 0 && currentFaceOpacity.current > 0) {
        currentFaceOpacity.current -= DURATION * delta;
        if (currentFaceOpacity.current < 0) currentFaceOpacity.current = 0;
      } else if (faceOpacity.current === 1 && currentFaceOpacity.current < 1) {
        currentFaceOpacity.current += DURATION * delta;
        if (currentFaceOpacity.current > 1) currentFaceOpacity.current = 1;
      }
      initialNeighbors();
      const { mx, my } = mouseCoords.current;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      faces.current.forEach((face) => {
        face.draw(ctx, mx, my);
      });
      edges.current.forEach((edge) => {
        edge.draw(ctx, mx, my);
      });
      points.current.forEach((point) => {
        point.draw(ctx, mx, my, delta);
      });

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    const trackingMouse = (e: MouseEvent) => {
      const mx = e.clientX * dpr;
      const my = e.clientY * dpr;
      mouseCoords.current = { mx, my };
    };
    window.addEventListener("mousemove", trackingMouse);
    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("mousemove", trackingMouse);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  useEffect(() => {
    if (resolvedTheme !== "light" && resolvedTheme !== "dark") return;
    currentPalette.current = BASE_PALETTE[resolvedTheme];
    currentActivePalette.current = ACTIVE_PALETTE[resolvedTheme];
    points.current.forEach((p) => {
      p.setColor(currentPalette.current.point, currentActivePalette.current.point);
    });
  }, [resolvedTheme]);

  return (
    <div className="w-full ">
      <canvas
        ref={canvasRef}
        className="z-[-1] w-screen h-screen fixed top-0 left-0 bg-surface-base"
      ></canvas>
      <div className="w-full h-[calc(100vh-64px)] flex flex-col justify-center items-start gap-2 pl-4 sm:pl-16">
        <span className={`w-fit text-h3`}>민경원의</span>

        {/* 실험하고 */}
        <div ref={expRef} className="w-fit flex flex-col">
          <span
            className={`w-fit text-hero font-extrabold ${mode === "exp" ? "text-primary-base pl-4" : "pl-0"} transition-all duration-300`}
          >
            실험하고
          </span>
          <div
            className={`w-fit pl-6 flex flex-col gap-2 ${mode === "exp" ? "h-40 sm:h-36 opacity-100 pt-4" : "h-0 opacity-0 pt-0"} overflow-hidden transition-all duration-300`}
          >
            <p className={`text-h3 ${mode === "exp" ? "w-fit" : "w-0"}`}>
              저는 호기심이 많은 사람입니다.
              <br />
              궁금한 것이 생기면 탐구하고,
              <br />
              직접 실험하며 원리를 체득합니다.
            </p>
            <div
              className={`flex flex-col sm:flex-row sm:gap-4 sm:items-center text-base ${mode === "exp" ? "w-fit" : "w-0"}`}
            >
              저에 대해 조금 더 알고 싶으신가요?
              <Link href="/about" className="text-base text-primary-base">
                About →
              </Link>
            </div>
          </div>
        </div>

        {/* 개발하고 */}
        <div ref={codeRef} className="w-fit flex flex-col">
          <span
            className={`w-fit text-hero font-extrabold ${mode === "code" ? "text-primary-base pl-4" : "pl-0"} transition-all duration-300`}
          >
            개발하고
          </span>
          <div
            className={`w-fit pl-6 flex flex-col gap-2 ${mode === "code" ? "h-40 sm:h-36 opacity-100 pt-4" : "h-0 opacity-0 pt-0"} overflow-hidden transition-all duration-300`}
          >
            <p className={`text-h3 ${mode === "code" ? "w-fit" : "w-0"}`}>
              실험을 통해 얻은 기술과 지식을
              <br />
              작은 프로젝트로 직접 만들며
              <br />
              온전히 체화합니다.
            </p>
            <div
              className={`flex flex-col sm:flex-row sm:gap-4 sm:items-center text-base ${mode === "code" ? "w-fit" : "w-0"}`}
            >
              제가 만든 프로젝트가 궁금하신가요?
              <Link href="/projects" className="text-base text-primary-base">
                Projects →
              </Link>
            </div>
          </div>
        </div>
        {/* 기록하는 공간 */}
        <div ref={recordRef} className="w-fit flex flex-col">
          <span
            className={`w-fit text-hero font-extrabold ${mode === "record" ? "text-primary-base pl-4" : "pl-0"} transition-all duration-300`}
          >
            기록하는 공간
          </span>
          <div
            className={`w-fit pl-6 flex flex-col gap-2 ${mode === "record" ? "h-40 sm:h-36 opacity-100 pt-4" : "h-0 opacity-0 pt-0"} overflow-hidden transition-all duration-300`}
          >
            <p className={`text-h3 ${mode === "record" ? "w-fit" : "w-0"}`}>
              인간의 기억은 휘발됩니다.
              <br />
              경험이 휘발되지 않도록 기록하고,
              <br />
              다시 꺼내 쓸 지식으로 남깁니다.
            </p>
            <div
              className={`flex flex-col sm:flex-row sm:gap-4 sm:items-center text-base ${mode === "record" ? "w-fit" : "w-0"}`}
            >
              저의 기록이 궁금하신가요?
              <Link href="/blog" className="text-base text-primary-base">
                Blog →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
