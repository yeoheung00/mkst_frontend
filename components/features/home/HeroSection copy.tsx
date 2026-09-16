
"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type Mode =
  | "idle"
  | "experiment"
  | "develop"
  | "record";

type Point = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
};

type RenderPoint = Point & {
  influence: number;
};

type Edge = {
  a: number;
  b: number;
  distance: number;
};

type Face = [number, number, number];

const POINT_COUNT = 120;

const CONNECTION_RADIUS = 135;
const MAX_CONNECTIONS_PER_POINT = 3;

const EXPERIMENT_RADIUS = 190;

const AUTO_MODE_DURATION = 3000;
const POST_LEAVE_HOLD = 6000;
const INITIAL_IDLE_DURATION = 1200;

const AUTO_MODES = [
  "experiment",
  "develop",
  "record",
] as const;

const MODE_CONFIG = {
  experiment: {
    label: "실험하고",
    href: "/projects",
  },

  develop: {
    label: "개발하고",
    href: "/projects",
  },

  record: {
    label: "기록하는 공간",
    href: "/blog",
  },
} as const;

type InteractiveMode =
  keyof typeof MODE_CONFIG;

function HeroModeLink({
  mode,
  active,
  onEnter,
  onLeave,
}: {
  mode: InteractiveMode;
  active: boolean;
  onEnter: (mode: InteractiveMode) => void;
  onLeave: () => void;
}) {
  const config = MODE_CONFIG[mode];

  return (
    <Link
      href={config.href}
      onMouseEnter={() => onEnter(mode)}
      onMouseLeave={onLeave}
      onFocus={() => onEnter(mode)}
      onBlur={onLeave}
      className={[
        "inline-block",
        "transition-all",
        "duration-700",
        "ease-out",
        active
          ? "text-text-primary"
          : "text-text-secondary hover:text-text-primary",
      ].join(" ")}
    >
      {config.label}
    </Link>
  );
}

export default function HeroComponent() {
  const containerRef =
    useRef<HTMLElement | null>(null);

  const canvasRef =
    useRef<HTMLCanvasElement | null>(null);

  const [mode, setMode] =
    useState<Mode>("idle");

  /*
   * Canvas animation loop에서 React state를
   * 직접 읽지 않기 위한 ref.
   */
  const modeRef =
    useRef<Mode>("idle");

  /*
   * 현재 Hero 텍스트 중 하나를 hover 중인지.
   */
  const isTriggerHoveredRef =
    useRef(false);

  const autoTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(
      null,
    );

  const leaveTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(
      null,
    );

  const initialTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(
      null,
    );

  /*
   * 자동 순환의 다음 모드.
   */
  const autoIndexRef =
    useRef(0);

  /*
   * 실제 마우스 위치.
   *
   * Hero 전체가 pointer event를 받는다.
   * Canvas 자체는 pointer-events-none이다.
   */
  const mouseRef = useRef({
    x: 0,
    y: 0,
    active: false,
  });

  /*
   * 자동 EXPERIMENT에서 사용할 가상 마우스.
   */
  const demoMouseRef = useRef({
    x: 0,
    y: 0,
  });

  /*
   * --------------------------------------------------
   * Mode helpers
   * --------------------------------------------------
   */

  const setCurrentMode =
    useCallback((nextMode: Mode) => {
      modeRef.current = nextMode;
      setMode(nextMode);
    }, []);

  const clearAutoTimer =
    useCallback(() => {
      if (autoTimerRef.current) {
        clearTimeout(
          autoTimerRef.current,
        );

        autoTimerRef.current = null;
      }
    }, []);

  const clearLeaveTimer =
    useCallback(() => {
      if (leaveTimerRef.current) {
        clearTimeout(
          leaveTimerRef.current,
        );

        leaveTimerRef.current = null;
      }
    }, []);

  /*
   * 자동 모드 순환
   *
   * experiment
   *    ↓ 3s
   * develop
   *    ↓ 3s
   * record
   *    ↓ 3s
   * experiment
   */
  const startAutoCycle =
    useCallback(() => {
      clearAutoTimer();
      clearLeaveTimer();

      if (
        isTriggerHoveredRef.current
      ) {
        return;
      }

      const nextMode =
        AUTO_MODES[
          autoIndexRef.current
        ];

      setCurrentMode(nextMode);

      autoIndexRef.current =
        (autoIndexRef.current + 1) %
        AUTO_MODES.length;

      autoTimerRef.current =
        setTimeout(() => {
          startAutoCycle();
        }, AUTO_MODE_DURATION);
    }, [
      clearAutoTimer,
      clearLeaveTimer,
      setCurrentMode,
    ]);

  /*
   * Hero 문구에 진입.
   *
   * 자동 순환과 6초 hold timer를 모두 중지하고
   * 사용자가 선택한 모드를 유지한다.
   */
  const handleModeEnter =
    useCallback(
      (nextMode: InteractiveMode) => {
        isTriggerHoveredRef.current =
          true;

        clearAutoTimer();
        clearLeaveTimer();

        setCurrentMode(nextMode);
      },
      [
        clearAutoTimer,
        clearLeaveTimer,
        setCurrentMode,
      ],
    );

  /*
   * Hero 문구에서 빠져나감.
   *
   * 현재 모드를 6초 유지한 뒤
   * 다시 자동 순환으로 복귀한다.
   */
  const handleModeLeave =
    useCallback(() => {
      isTriggerHoveredRef.current =
        false;

      clearAutoTimer();
      clearLeaveTimer();

      leaveTimerRef.current =
        setTimeout(() => {
          if (
            isTriggerHoveredRef.current
          ) {
            return;
          }

          setCurrentMode("idle");

          /*
           * 다시 experiment부터 시작.
           */
          autoIndexRef.current = 0;

          autoTimerRef.current =
            setTimeout(() => {
              startAutoCycle();
            }, 300);
        }, POST_LEAVE_HOLD);
    }, [
      clearAutoTimer,
      clearLeaveTimer,
      setCurrentMode,
      startAutoCycle,
    ]);

  /*
   * 초기 진입.
   *
   * 잠깐 IDLE을 보여준 뒤 자동 데모 시작.
   */
  useEffect(() => {
    initialTimerRef.current =
      setTimeout(() => {
        startAutoCycle();
      }, INITIAL_IDLE_DURATION);

    return () => {
      if (initialTimerRef.current) {
        clearTimeout(
          initialTimerRef.current,
        );
      }

      clearAutoTimer();
      clearLeaveTimer();
    };
  }, [
    clearAutoTimer,
    clearLeaveTimer,
    startAutoCycle,
  ]);

  /*
   * --------------------------------------------------
   * Pointer
   * --------------------------------------------------
   *
   * Canvas가 콘텐츠 뒤에 있기 때문에
   * Canvas 자체에서 pointermove를 받지 않는다.
   *
   * Hero section 전체가 pointer를 받고,
   * Canvas는 pointer-events-none으로 둔다.
   */

  const handlePointerMove =
    useCallback(
      (
        event: React.PointerEvent<HTMLElement>,
      ) => {
        const container =
          containerRef.current;

        if (!container) {
          return;
        }

        const rect =
          container.getBoundingClientRect();

        mouseRef.current.x =
          event.clientX - rect.left;

        mouseRef.current.y =
          event.clientY - rect.top;

        mouseRef.current.active =
          true;
      },
      [],
    );

  const handlePointerLeave =
    useCallback(() => {
      mouseRef.current.active =
        false;
    }, []);

  /*
   * --------------------------------------------------
   * Canvas
   * --------------------------------------------------
   */

  useEffect(() => {
    const canvas =
      canvasRef.current;

    const container =
      containerRef.current;

    if (
      !canvas ||
      !container
    ) {
      return;
    }

    const ctx =
      canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    let animationFrame = 0;

    const points: Point[] = [];

    let width = 0;
    let height = 0;
    let dpr = 1;

    /*
     * Canvas resize
     */
    const resize = () => {
      const rect =
        container.getBoundingClientRect();

      width = rect.width;
      height = rect.height;

      dpr = Math.min(
        window.devicePixelRatio || 1,
        2,
      );

      canvas.width =
        width * dpr;

      canvas.height =
        height * dpr;

      canvas.style.width =
        `${width}px`;

      canvas.style.height =
        `${height}px`;

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0,
      );
    };

    /*
     * Point 생성
     */
    const createPoints = () => {
      points.length = 0;

      for (
        let i = 0;
        i < POINT_COUNT;
        i++
      ) {
        points.push({
          x:
            Math.random() *
            width,

          y:
            Math.random() *
            height,

          vx:
            (Math.random() - 0.5) *
            0.12,

          vy:
            (Math.random() - 0.5) *
            0.12,

          radius:
            1.2 +
            Math.random() *
              0.8,

          phase:
            Math.random() *
            Math.PI *
            2,
        });
      }
    };

    resize();
    createPoints();

    const resizeObserver =
      new ResizeObserver(() => {
        resize();
        createPoints();
      });

    resizeObserver.observe(
      container,
    );

    /*
     * --------------------------------------------------
     * Utility
     * --------------------------------------------------
     */

    const distanceSquared = (
      a: Point,
      b: Point,
    ) => {
      const dx =
        a.x - b.x;

      const dy =
        a.y - b.y;

      return (
        dx * dx +
        dy * dy
      );
    };

    /*
     * 점과 마우스 사이의 influence.
     *
     * 0 = 영향 없음
     * 1 = 마우스 바로 아래
     *
     * sqrt는 여기서 한 번만 사용.
     */
    const getInfluence = (
      point: Point,
      pointer: {
        x: number;
        y: number;
      },
    ) => {
      const dx =
        point.x -
        pointer.x;

      const dy =
        point.y -
        pointer.y;

      const distanceSq =
        dx * dx +
        dy * dy;

      const radiusSq =
        EXPERIMENT_RADIUS *
        EXPERIMENT_RADIUS;

      if (
        distanceSq >=
        radiusSq
      ) {
        return 0;
      }

      return (
        1 -
        Math.sqrt(
          distanceSq,
        ) /
          EXPERIMENT_RADIUS
      );
    };

    /*
     * --------------------------------------------------
     * Mouse position
     * --------------------------------------------------
     */

    const getMousePosition = (
      time: number,
    ) => {
      /*
       * 실제 마우스가 존재하면
       * 실제 마우스를 사용.
       */
      if (
        mouseRef.current.active
      ) {
        return {
          x: mouseRef.current.x,
          y: mouseRef.current.y,
        };
      }

      /*
       * 자동 EXPERIMENT.
       *
       * 화면 안을 천천히 움직이는
       * 가상 마우스.
       */
      const t =
        time * 0.00018;

      const x =
        width * 0.5 +
        Math.sin(
          t * 1.13,
        ) *
          width *
          0.32;

      const y =
        height * 0.5 +
        Math.sin(
          t * 0.83 + 1.7,
        ) *
          height *
          0.28;

      demoMouseRef.current.x =
        x;

      demoMouseRef.current.y =
        y;

      return {
        x,
        y,
      };
    };

    /*
     * --------------------------------------------------
     * Graph
     * --------------------------------------------------
     *
     * 모든 점을 서로 연결하지 않고
     * 가까운 점 최대 3개만 연결한다.
     */

    const getEdges = (): Edge[] => {
      const edges: Edge[] = [];

      for (
        let i = 0;
        i < points.length;
        i++
      ) {
        const neighbors: {
          index: number;
          distance: number;
        }[] = [];

        for (
          let j = 0;
          j < points.length;
          j++
        ) {
          if (i === j) {
            continue;
          }

          const dSq =
            distanceSquared(
              points[i],
              points[j],
            );

          if (
            dSq <=
            CONNECTION_RADIUS *
              CONNECTION_RADIUS
          ) {
            neighbors.push({
              index: j,
              distance:
                Math.sqrt(
                  dSq,
                ),
            });
          }
        }

        neighbors.sort(
          (a, b) =>
            a.distance -
            b.distance,
        );

        for (
          let k = 0;
          k <
          Math.min(
            MAX_CONNECTIONS_PER_POINT,
            neighbors.length,
          );
          k++
        ) {
          const neighbor =
            neighbors[k];

          const a =
            Math.min(
              i,
              neighbor.index,
            );

          const b =
            Math.max(
              i,
              neighbor.index,
            );

          const exists =
            edges.some(
              (edge) =>
                edge.a === a &&
                edge.b === b,
            );

          if (!exists) {
            edges.push({
              a,
              b,
              distance:
                neighbor.distance,
            });
          }
        }
      }

      return edges;
    };

    /*
     * --------------------------------------------------
     * Face detection
     * --------------------------------------------------
     */

    const findFaces = (
      edges: Edge[],
    ): Face[] => {
      const adjacency =
        new Map<
          number,
          Set<number>
        >();

      for (const edge of edges) {
        if (
          !adjacency.has(
            edge.a,
          )
        ) {
          adjacency.set(
            edge.a,
            new Set(),
          );
        }

        if (
          !adjacency.has(
            edge.b,
          )
        ) {
          adjacency.set(
            edge.b,
            new Set(),
          );
        }

        adjacency
          .get(edge.a)!
          .add(edge.b);

        adjacency
          .get(edge.b)!
          .add(edge.a);
      }

      const faces: Face[] = [];

      for (
        let a = 0;
        a < points.length;
        a++
      ) {
        const neighborsA =
          adjacency.get(a);

        if (!neighborsA) {
          continue;
        }

        for (
          const b of neighborsA
        ) {
          if (b <= a) {
            continue;
          }

          const neighborsB =
            adjacency.get(b);

          if (!neighborsB) {
            continue;
          }

          for (
            const c of neighborsB
          ) {
            if (c <= b) {
              continue;
            }

            /*
             * 세 점 모두 서로 연결되어야
             * triangle face를 만든다.
             */
            if (
              !neighborsA.has(c)
            ) {
              continue;
            }

            const p1 =
              points[a];

            const p2 =
              points[b];

            const p3 =
              points[c];

            const area =
              Math.abs(
                (
                  p1.x *
                    (p2.y -
                      p3.y) +
                  p2.x *
                    (p3.y -
                      p1.y) +
                  p3.x *
                    (p1.y -
                      p2.y)
                ) / 2,
              );

            /*
             * 너무 작은 삼각형은 제거.
             */
            if (area < 250) {
              continue;
            }

            faces.push([
              a,
              b,
              c,
            ]);
          }
        }
      }

      return faces;
    };

    /*
     * --------------------------------------------------
     * Render points
     * --------------------------------------------------
     *
     * 모든 모드에서 점의 mouse influence 유지.
     *
     * experiment
     * develop
     * record
     *
     * 모두 동일하게 점이 반응한다.
     */

    const drawPoints = (
      renderPoints: RenderPoint[],
      time: number,
    ) => {
      for (
        const point of renderPoints
      ) {
        const influence =
          point.influence;

        let radius =
          point.radius;

        /*
         * 마우스 가까이에서 점 확대.
         */
        radius +=
          influence * 3.2;

        /*
         * 기본 alpha.
         */
        let alpha =
          0.22;

        alpha +=
          influence * 0.42;

        /*
         * 아주 약한 breathing.
         */
        radius +=
          Math.sin(
            time * 0.001 +
              point.phase,
          ) * 0.12;

        ctx.beginPath();

        ctx.arc(
          point.x,
          point.y,
          Math.max(
            radius,
            0.4,
          ),
          0,
          Math.PI * 2,
        );

        /*
         * influence가 높을수록
         * 무채색 → 푸른 계열.
         */
        if (
          influence > 0
        ) {
          const red =
            100 -
            Math.floor(
              influence * 5,
            );

          const green =
            100 +
            Math.floor(
              influence * 50,
            );

          const blue =
            100 +
            Math.floor(
              influence * 110,
            );

          ctx.fillStyle =
            `rgba(${red}, ${green}, ${blue}, ${alpha})`;
        } else {
          ctx.fillStyle =
            `rgba(100, 100, 100, ${alpha})`;
        }

        ctx.fill();
      }
    };

    /*
     * --------------------------------------------------
     * Render edges
     * --------------------------------------------------
     *
     * 선의 influence는 양 끝점 중
     * 더 강한 influence를 사용한다.
     *
     * 그래서 마우스가 특정 점에 가까워지면
     * 그 점으로 연결된 선도 함께 반응한다.
     */

    const drawEdges = (
      edges: Edge[],
      renderPoints: RenderPoint[],
      time: number,
    ) => {
      if (
        edges.length === 0
      ) {
        return;
      }

      ctx.save();

      for (
        const edge of edges
      ) {
        const p1 =
          renderPoints[
            edge.a
          ];

        const p2 =
          renderPoints[
            edge.b
          ];

        /*
         * 두 점 중 더 강한 영향값.
         */
        const influence =
          Math.max(
            p1.influence,
            p2.influence,
          );

        /*
         * 원래 연결 거리 기반 alpha.
         */
        const normalized =
          1 -
          edge.distance /
            CONNECTION_RADIUS;

        /*
         * 기본 선 두께.
         *
         * 가까워지면 최대 약 3배.
         */
        const lineWidth =
          0.55 +
          influence * 1.5;

        /*
         * 기본 색 → 유채색.
         */
        const red =
          110 -
          Math.floor(
            influence * 15,
          );

        const green =
          110 +
          Math.floor(
            influence * 35,
          );

        const blue =
          110 +
          Math.floor(
            influence * 90,
          );

        /*
         * 마우스가 가까우면 선 자체도
         * 좀 더 존재감 있게.
         */
        const alpha =
          0.045 +
          normalized * 0.08 +
          influence * 0.22;

        /*
         * 아주 약한 pulse.
         */
        const pulse =
          Math.sin(
            time * 0.0007 +
              edge.a * 0.13,
          ) * 0.01;

        ctx.lineWidth =
          lineWidth;

        ctx.strokeStyle =
          `rgba(${red}, ${green}, ${blue}, ${Math.max(
            alpha + pulse,
            0,
          )})`;

        ctx.beginPath();

        ctx.moveTo(
          p1.x,
          p1.y,
        );

        ctx.lineTo(
          p2.x,
          p2.y,
        );

        ctx.stroke();
      }

      ctx.restore();
    };

    /*
     * --------------------------------------------------
     * Render faces
     * --------------------------------------------------
     *
     * 면은 점/선보다 훨씬 은은하게.
     *
     * 세 꼭짓점의 influence 중
     * 평균값을 사용한다.
     */

    const drawFaces = (
      faces: Face[],
      renderPoints: RenderPoint[],
      time: number,
    ) => {
      if (
        faces.length === 0
      ) {
        return;
      }

      ctx.save();

      for (
        const face of faces
      ) {
        const [a, b, c] =
          face;

        const p1 =
          renderPoints[a];

        const p2 =
          renderPoints[b];

        const p3 =
          renderPoints[c];

        /*
         * 세 점의 평균 influence.
         */
        const influence =
          (
            p1.influence +
            p2.influence +
            p3.influence
          ) / 3;

        /*
         * 면은 선보다 약하게.
         */
        const pulse =
          Math.sin(
            time * 0.0012 +
              a * 0.1,
          ) * 0.004;

        const alpha =
          0.025 +
          influence * 0.07 +
          pulse;

        /*
         * 무채색 → 은은한 유채색.
         */
        const red =
          120 -
          Math.floor(
            influence * 15,
          );

        const green =
          120 +
          Math.floor(
            influence * 15,
          );

        const blue =
          120 +
          Math.floor(
            influence * 55,
          );

        ctx.fillStyle =
          `rgba(${red}, ${green}, ${blue}, ${Math.max(
            alpha,
            0,
          )})`;

        ctx.beginPath();

        ctx.moveTo(
          p1.x,
          p1.y,
        );

        ctx.lineTo(
          p2.x,
          p2.y,
        );

        ctx.lineTo(
          p3.x,
          p3.y,
        );

        ctx.closePath();

        ctx.fill();
      }

      ctx.restore();
    };

    /*
     * --------------------------------------------------
     * Update
     * --------------------------------------------------
     */

    const updatePoints = () => {
      for (
        const point of points
      ) {
        point.x += point.vx;
        point.y += point.vy;

        /*
         * 화면 가장자리 wrap.
         */
        if (
          point.x < -20
        ) {
          point.x =
            width + 20;
        }

        if (
          point.x >
          width + 20
        ) {
          point.x = -20;
        }

        if (
          point.y < -20
        ) {
          point.y =
            height + 20;
        }

        if (
          point.y >
          height + 20
        ) {
          point.y = -20;
        }
      }
    };

    /*
     * --------------------------------------------------
     * Main render loop
     * --------------------------------------------------
     */

    const render = (
      time: number,
    ) => {
      const currentMode =
        modeRef.current;

      ctx.clearRect(
        0,
        0,
        width,
        height,
      );

      updatePoints();

      /*
       * 현재 마우스 위치.
       *
       * 실제 마우스가 있으면 실제 마우스,
       * 없으면 자동 demo cursor.
       */
      const pointer =
        getMousePosition(time);

      /*
       * 핵심:
       *
       * 각 점의 influence를 여기서 딱 한 번
       * 계산하고 이후 점/선/면에서 공유한다.
       */
      const renderPoints: RenderPoint[] =
        points.map(
          (point) => ({
            ...point,
            influence:
              getInfluence(
                point,
                pointer,
              ),
          }),
        );

      /*
       * 연결 구조.
       *
       * develop / record에서만 사용.
       */
      let edges: Edge[] = [];

      if (
        currentMode ===
          "develop" ||
        currentMode ===
          "record"
      ) {
        edges =
          getEdges();
      }

      /*
       * RECORD:
       *
       * 면 → 선 → 점 순으로 그린다.
       *
       * 뒤에 있는 면이 먼저 그려져야
       * 점과 선이 위에 자연스럽게 올라온다.
       */
      if (
        currentMode ===
        "record"
      ) {
        const faces =
          findFaces(edges);

        drawFaces(
          faces,
          renderPoints,
          time,
        );
      }

      /*
       * DEVELOP / RECORD:
       * 선
       */
      if (
        currentMode ===
          "develop" ||
        currentMode ===
          "record"
      ) {
        drawEdges(
          edges,
          renderPoints,
          time,
        );
      }

      /*
       * 모든 모드:
       * 점
       */
      drawPoints(
        renderPoints,
        time,
      );

      animationFrame =
        requestAnimationFrame(
          render,
        );
    };

    animationFrame =
      requestAnimationFrame(
        render,
      );

    return () => {
      cancelAnimationFrame(
        animationFrame,
      );

      resizeObserver.disconnect();
    };
  }, []);

  /*
   * 상태 표시
   */

  const getStatusLabel =
    () => {
      switch (mode) {
        case "experiment":
          return "EXPERIMENT";

        case "develop":
          return "DEVELOP";

        case "record":
          return "RECORD";

        default:
          return "IDLE";
      }
    };

  return (
    <section
      ref={containerRef}
      onPointerMove={
        handlePointerMove
      }
      onPointerLeave={
        handlePointerLeave
      }
      className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden"
    >
      {/*
       * Canvas는 시각적인 레이어만 담당.
       *
       * pointer-events-none으로 설정해서
       * Hero 전체의 pointer 이벤트를 방해하지 않는다.
       */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      />

      {/*
       * Hero content
       */}
      <div className="relative z-10 flex min-h-[calc(100vh-4rem)] flex-col justify-center px-6 py-20">
        <div className="mx-auto w-full max-w-6xl">
          {/*
           * 작은 공간 이름
           */}
          <div className="mb-7">
            <span className="font-mono text-sub text-text-secondary">
              MINK&apos;S SPACE
            </span>
          </div>

          {/*
           * Main Hero
           */}
          <div>
            <p className="mb-4 text-sub text-text-secondary">
              민경원의
            </p>

            <h1 className="max-w-5xl text-h1 leading-[1.08] tracking-tight">
              <HeroModeLink
                mode="experiment"
                active={
                  mode ===
                  "experiment"
                }
                onEnter={
                  handleModeEnter
                }
                onLeave={
                  handleModeLeave
                }
              />

              <br />

              <HeroModeLink
                mode="develop"
                active={
                  mode ===
                  "develop"
                }
                onEnter={
                  handleModeEnter
                }
                onLeave={
                  handleModeLeave
                }
              />

              <br />

              <HeroModeLink
                mode="record"
                active={
                  mode ===
                  "record"
                }
                onEnter={
                  handleModeEnter
                }
                onLeave={
                  handleModeLeave
                }
              />
            </h1>
          </div>

          {/*
           * 설명
           */}
          <div className="mt-10 max-w-md">
            <p className="text-base leading-7 text-text-secondary">
              만들고 싶은 것을 만들고,
              <br />
              궁금한 것을 실험하고,
              <br />
              그 과정을 기록합니다.
            </p>
          </div>

          {/*
           * Navigation
           */}
          <nav className="mt-12 flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="rounded-full border border-border-default px-4 py-2 text-sub transition-colors hover:bg-text-primary hover:text-background"
            >
              Blog
            </Link>

            <Link
              href="/projects"
              className="rounded-full border border-border-default px-4 py-2 text-sub transition-colors hover:bg-text-primary hover:text-background"
            >
              Projects
            </Link>

            <Link
              href="/about"
              className="rounded-full border border-border-default px-4 py-2 text-sub transition-colors hover:bg-text-primary hover:text-background"
            >
              About
            </Link>
          </nav>
        </div>
      </div>

      {/*
       * 현재 인터랙션 상태
       */}
      <div className="absolute bottom-6 right-6 z-10 hidden font-mono text-sub text-text-secondary sm:block">
        <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-current align-middle" />

        {getStatusLabel()}
      </div>
    </section>
  );
}
