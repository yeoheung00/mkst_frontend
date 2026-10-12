// app/auth/callback/page.tsx
"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setAccessToken } from "@/lib/util/auth";
import { useAuth } from "@/context/AuthContext";

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { fetchMe } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (error) {
      alert("로그인에 실패했습니다.");
      router.replace("/login");
      return;
    }

    if (token) {
      // 1. 메모리에 Access Token 즉시 주입
      setAccessToken(token);

      // 2. /refresh 없이 바로 내 정보 조회 후 이동
      router.replace("/");
    }
  }, [searchParams, router, fetchMe]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-gray-600">로그인 정보를 동기화하는 중입니다...</p>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<div>로그인 처리 중...</div>}>
      <CallbackContent />
    </Suspense>
  );
}
