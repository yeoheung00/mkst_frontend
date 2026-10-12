import { getAccessToken, setAccessToken } from "../util/auth";
import { requestTokenRefresh } from "./auth";

// lib/api/client.ts
interface FetchClientOptions extends RequestInit {
  skipAuth?: boolean; // 인증 헤더(Bearer 토큰) 생략 옵션
}

export const fetchClient = async (
  endpoint: string,
  options: FetchClientOptions = {}
) => {
  const { skipAuth = false, headers, ...rest } = options;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const url = endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`;

  const requestHeaders = new Headers(headers);

  // 인증이 필요한 경우에만 메모리에서 토큰을 꺼내 헤더에 주입
  if (!skipAuth) {
    const token = getAccessToken();
    if (token) {
      requestHeaders.set('Authorization', `Bearer ${token}`);
    }
  }

  // 기본 Content-Type 설정 (Body가 있을 때)
  if (rest.body && !requestHeaders.has('Content-Type')) {
    requestHeaders.set('Content-Type', 'application/json');
  }

  let res = await fetch(url, { ...rest, headers: requestHeaders });

  // 인증 요청인데 401이 떴을 때만 Silent Refresh 인터셉트 수행
  if (!skipAuth && res.status === 401) {
    const newToken = await requestTokenRefresh();
    if (newToken) {
      setAccessToken(newToken);
      requestHeaders.set('Authorization', `Bearer ${newToken}`);
      res = await fetch(url, { ...rest, headers: requestHeaders });
    }
  }

  return res;
};
