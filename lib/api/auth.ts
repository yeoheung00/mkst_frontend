// lib/api/auth.ts (또는 refresh를 호출하는 파일)

let refreshPromise: Promise<string | null> | null = null;

export const requestTokenRefresh = async (): Promise<string | null> => {
  // 이미 다른 컴포넌트나 이전 useEffect에서 리프레시를 진행 중이라면 그 Promise를 같이 기다림
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`,
        {
          method: 'POST',
          credentials: 'include',
        }
      );

      if (!res.ok) {
        return null;
      }

      const data = await res.json();
      return data.accessToken as string;
    } catch (err) {
      console.error(err);
      return null;
    } finally {
      // 요청이 끝나면 초기화
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};
