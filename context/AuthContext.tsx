// context/AuthContext.tsx
'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { getAccessToken, setAccessToken } from '@/lib/util/auth';
import { fetchClient } from '@/lib/api/client';
import { requestTokenRefresh } from '@/lib/api/auth';

export interface User {
  id: string;
  role: string;
  name?: string;
  email?: string;
  image?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  fetchMe: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  setUser: () => {},
  fetchMe: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 2. fetchMe에서 직접 updateUser 호출
  const fetchMe = useCallback(async () => {
    try {
      const res = await fetchClient('/api/user/me');
      if (res.ok) {
        const userData = await res.json();
        // 여기서 바로 상태와 세션스토리지에 저장!
        setUser(userData);
        return userData;
      } else {
        setUser(null);
        return null;
      }
    } catch {
      setUser(null);
      return null;
    }
  }, []);

  // F5 새로고침 시 세션 복구: 메모리에 토큰이 없을 때만 /refresh 수행
  const initAuth = useCallback(async () => {
    try {
      // 1. 이미 메모리에 토큰이 있다면 리프레시 건너뛰고 fetchMe만 수행
      if (getAccessToken()) {
        await fetchMe();
        return;
      }

      // 2. 메모리가 비어있을 때(새로고침)만 /refresh 요청
      const accessToken = await requestTokenRefresh();

      // 3. 액세스 토큰 발급 실패시 비로그인 처리
      if (!accessToken) {
        setAccessToken(null);
        setUser(null);
        return;
      }

      setAccessToken(accessToken);

      // 4. 발급받은 새 토큰으로 유저 정보 로드
      await fetchMe();
    } catch {
      setAccessToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [fetchMe]);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  const logout = async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/auth/logout`,
        {
          method: 'POST',
          credentials: 'include',
        }
      );
    } finally {
      setAccessToken(null);
      setUser(null);
      window.location.href = '/';
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, setUser, fetchMe, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
