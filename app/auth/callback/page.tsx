// app/auth/callback/page.tsx
'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { setAccessToken } from '@/lib/util/auth';
import { useAuth } from '@/context/AuthContext';

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshAuth } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (error) {
      console.error('로그인 실패 파라미터 수신:', error);
      alert('로그인에 실패했습니다.');
      router.replace('/login');
      return;
    }

    if (token) {
      console.log('백엔드로부터 수신한 Access Token:', token);
      setAccessToken(token); // 메모리 변수에 토큰 등록!
      refreshAuth().then(() => {
        router.replace('/');
      });
    }
  }, [searchParams, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-gray-600">로그인 처리 중입니다...</p>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<div>로그인 확인 중...</div>}>
      <CallbackContent />
    </Suspense>
  );
}