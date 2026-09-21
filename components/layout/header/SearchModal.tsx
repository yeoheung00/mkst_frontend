"use client";

import { X } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { search } from "@/lib/api/search";
import { formatRelativeDate } from "@/lib/util";
import { SearchResult } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function SearchModal({
  onCloseAction,
  onItemSelectAction,
}: {
  onCloseAction: () => void;
  onItemSelectAction: () => void;
}) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCloseAction();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCloseAction]);

  // 1. 디바운스 타이머 (500ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // 2. 검색 실행 (debouncedTerm 확정 시)
  useEffect(() => {
    // 3자 미만이면 네트워크 요청 없이 종료
    if (debouncedTerm.length < 3) {
      return;
    }

    let ignore = false;
    const executeSearch = async () => {
      setIsFetching(true);
      try {
        const searchRes = await search(debouncedTerm);
        if (!ignore) {
          setResults(searchRes.success ? searchRes.data : []);
          setHasSearched(true);
        }
      } catch (error) {
        console.error("Search failed:", error);
        if (!ignore) {
          setResults([]);
          setHasSearched(true);
        }
      } finally {
        if (!ignore) {
          setIsFetching(false);
        }
      }
    };

    executeSearch();

    return () => {
      ignore = true;
    };
  }, [debouncedTerm]);

  // 3. 파생 상태 연산
  const trimmed = searchTerm.trim();

  // 사용자가 타이핑 중(디바운스 대기 중)이거나 실제 서버 응답을 기다리는 중
  const isTyping = trimmed !== debouncedTerm;
  const isProcessing = trimmed.length > 0 && (isTyping || isFetching);

  // 세 글자 미만 경고: 디바운스가 완료된 시점에만 보이며, 타이핑을 다시 시작(isTyping)하면 즉시 사라짐
  const showTooShortWarning =
    !isTyping && debouncedTerm.length > 0 && debouncedTerm.length < 3;

  // 결과 없음 안내: 검색이 1회 이상 완료되었고, 3자 이상이며, 결과 배열이 비어있을 때
  const showEmpty =
    hasSearched && debouncedTerm.length >= 3 && results.length === 0;

  return (
    <div className="fixed inset-0 z-30 flex items-start justify-center px-4 py-4 sm:py-32 overflow-y-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCloseAction}
      />

      {/* Modal Window */}
      <div className="relative z-10 w-full max-w-4xl min-h-96 max-h-full bg-surface-base border border-border-default rounded-xl shadow-2xl overflow-y-auto">
        {/* header */}
        <div className="sticky flex top-0 w-full bg-surface-sub border-b border-border-default">
          <Button
            variant="ghost"
            onClick={onCloseAction}
            className="m-4 w-8 h-8 rounded-md"
          >
            <X />
          </Button>
          <input
            type="text"
            className="grow h-16 focus:outline-none"
            placeholder="검색어를 입력하세요 (3글자 이상)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
          {/* Dot Pulse Animation (타이핑 ~ API 완료까지 노출) */}
          {isProcessing && (
            <div className="w-16 h-16 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-text-primary animate-bounce [animation-delay:-0.4s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-text-primary animate-bounce [animation-delay:-0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-text-primary animate-bounce" />
            </div>
          )}
        </div>

        {/* 세 글자 미만 경고 (다시 타이핑하면 즉시 언마운트) */}
        {showTooShortWarning && (
          <p className="py-8 text-center">
            검색어를 세 글자 이상 입력해주세요.
          </p>
        )}

        {/* 결과 없음 */}
        {showEmpty && (
          <p className="py-8 text-center">찾으시는 게시글이 없습니다.</p>
        )}

        {/* 검색 결과 (타이핑 중에도 직전 결과 유지) */}
        {debouncedTerm.length >= 3 && results.length > 0 && (
          <SearchItem
            results={results}
            onItemSelectAction={onItemSelectAction}
          />
        )}
      </div>
    </div>
  );
}

function SearchItem({
  results,
  onItemSelectAction,
}: {
  results: SearchResult[];
  onItemSelectAction: () => void;
}) {
  const router = useRouter();
  const handleItemClick = (href: string) => {
    onItemSelectAction(); // 1. 모달 닫기 (isSearchRef 플래그 해제)
    router.replace(href); // 2. pushState로 쌓인 모달 자리를 상세 페이지 주소로 덮어쓰기!
  };
  return (
    <div className="overflow-y-auto">
      {results.map((result) => (
        <div
          key={result.slug}
          onClick={() =>
            handleItemClick(`/blog/${result.category.slug}/${result.slug}`)
          }
          className="p-4 space-y-2 border-b border-border-default cursor-pointer"
        >
          <h2 className="truncate text-h2 text-text-primary group-hover:text-primary-base">
            {result.title}
          </h2>
          <p className="line-clamp-1 sm:line-clamp-2">{result.summary}</p>
          <div className="text-sub text-text-secondary flex gap-2">
            <span className="font-semibold text-text-primary">
              {result.category.name}
            </span>
            <span>•</span>
            {formatRelativeDate(result.createdAt)}{" "}
            {result.createdAt !== result.updatedAt &&
              `(수정 ${formatRelativeDate(result.updatedAt)})`}
            <span>•</span>
            <span>{result._count.likes} 좋아요</span>
            <span>•</span>
            <span>{result._count.comments} 댓글</span>
          </div>
        </div>
      ))}
    </div>
  );
}
