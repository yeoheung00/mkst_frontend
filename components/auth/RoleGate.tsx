'use client';

import { ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';

interface RoleGateProps {
  children: ReactNode;
  allowedRoles?: string[]; // 예: ['ADMIN'], ['USER', 'ADMIN']
  requireAuth?: boolean;   // 단순히 로그인 여부만 볼 때
  fallback?: ReactNode;    // 권한 없을 때 보여줄 대체 UI (기본값: null)
}

export function RoleGate({
  children,
  allowedRoles,
  requireAuth = true,
  fallback = null,
}: RoleGateProps) {
  const { user, isLoading } = useAuth();

  // 아직 인증 복구 중(새로고침 직후 등)일 때는 깜빡임 방지용 처리
  if (isLoading) return null;

  // 비로그인 상태인데 로그인이 필요한 경우
  if (requireAuth && !user) return <>{fallback}</>;

  // 특정 Role 조건이 걸려있는 경우
  if (allowedRoles && (!user || !allowedRoles.includes(user.role))) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
