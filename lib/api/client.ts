// lib/api/client.ts
import { getAccessToken, setAccessToken } from '@/lib/util/auth';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// 토큰 갱신 대기 중인 요청들에게 새 토큰 전달
const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

// 토큰 갱신 대기 큐에 등록
const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

export const fetchClient = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const url = `${BASE_URL}${endpoint}`;
  const token = getAccessToken();

  // 헤더 설정 (Access Token 첨부)
  const headers = new Headers(options.headers || {});
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  // credentials: 'include' -> HttpOnly 쿠키(refreshToken) 자동 동봉
  const config: RequestInit = {
    ...options,
    headers,
    credentials: 'include',
  };

  let response = await fetch(url, config);

  // 401(토큰 만료) 감지 시 무중단 자동 갱신 (Silent Refresh)
  if (response.status === 401 && !endpoint.includes('/api/auth/refresh')) {
    if (isRefreshing) {
      // 이미 다른 요청이 갱신 중이라면 대기 후 새 토큰으로 재시도
      return new Promise<Response>((resolve) => {
        addRefreshSubscriber(async (newToken: string) => {
          headers.set('Authorization', `Bearer ${newToken}`);
          resolve(fetch(url, { ...config, headers }));
        });
      });
    }

    isRefreshing = true;

    try {
      // 백엔드에 쿠키(refreshToken)를 실어 새 Access Token 요청
      const refreshRes = await fetch(`${BASE_URL}/api/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!refreshRes.ok) {
        throw new Error('리프레시 세션 만료');
      }

      const { accessToken: newAccessToken } = await refreshRes.json();
      setAccessToken(newAccessToken);
      onRefreshed(newAccessToken);

      // 원래 실패했던 요청에 새 Access Token을 꽂고 재실행
      headers.set('Authorization', `Bearer ${newAccessToken}`);
      return await fetch(url, { ...config, headers });
    } catch (refreshError) {
      // 리프레시 토큰까지 만료되었으면 메모리 정리
      setAccessToken(null);
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }

  return response;
};