'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: string[]; // 예: ['ADMIN']
  requireAuth?: boolean;   // 단순히 로그인 필요 여부
}

export function AuthGuard({
  children,
  allowedRoles,
  requireAuth = true,
}: AuthGuardProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // 1. 아직 새로고침 복구(initAuth) 중이면 판단을 보류함
    if (isLoading) return;

    // 2. 로그인이 필요한데 유저가 없는 경우 -> 메인으로 리디렉트
    if (requireAuth && !user) {
      alert("로그인이 필요합니다.");
      router.replace('/');
      return;
    }

    // 3. 특정 Role(예: ADMIN)이 필요한데 권한이 맞지 않는 경우 -> 메인으로 리디렉트
    if (allowedRoles && (!user || !allowedRoles.includes(user.role))) {
      alert("접근 권한이 없습니다.");
      router.replace('/');
    }
  }, [user, isLoading, allowedRoles, requireAuth, router]);

  // 세션 복원 중이거나 리디렉트 대상인 경우 본문 UI가 잠깐이라도 노출되지 않도록 차단
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-neutral-400">인증 상태를 확인하고 있습니다...</p>
      </div>
    );
  }

  // 권한 불일치 시 리디렉트가 일어나는 찰나의 화면 플래시(깜빡임) 방지
  if (requireAuth && !user) return null;
  if (allowedRoles && (!user || !allowedRoles.includes(user.role))) return null;

  return <>{children}</>;
}
