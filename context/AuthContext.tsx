// context/AuthContext.tsx
'use client';

import React, { createContext, useContext, useEffect, useState, useTransition } from 'react';
import { setAccessToken } from '@/lib/util/auth';
import { fetchClient } from '@/lib/api/client';

export interface User {
  id: string;
  role: string;
  name?: string;
  email?: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  logout: async () => {},
  refreshAuth: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 1. 세션 복구 및 내 정보 갱신 함수
  const refreshAuth = async () => {
    try {
      // 1-1. 백엔드 /api/auth/refresh 호출로 새 Access Token 발급
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/auth/refresh`,
        {
          method: 'POST',
          credentials: 'include',
        }
      );

      if (!res.ok) {
        throw new Error('인증 세션 없음');
      }

      const { accessToken } = await res.json();
      setAccessToken(accessToken);

      // 1-2. 방금 발급받은 토큰으로 내 정보(User Profile) 조회
      const userRes = await fetchClient('/user/me');
      if (userRes.ok) {
        const userData = await userRes.json();
        setUser(userData);
      }
    } catch {
      // 비로그인 상태이거나 리프레시 만료 시
      setAccessToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // 2. 앱 마운트 시 (새로고침 시) 1회 자동 실행
  useEffect(() => {
    refreshAuth();
  }, []);

  // 3. 로그아웃 핸들러
  const logout = async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/auth/logout`,
        {
          method: 'POST',
          credentials: 'include',
        }
      );
    } catch (err) {
      console.error('로그아웃 요청 실패:', err);
    } finally {
      setAccessToken(null);
      setUser(null);
      window.location.href = '/';
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, logout, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);