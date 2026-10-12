export const handleKakaoLogin = () => {
  const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
  const redirectUri = encodeURIComponent(
    process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!
  );

  if (!clientId) {
    console.error('NEXT_PUBLIC_KAKAO_CLIENT_ID 환경 변수가 설정되지 않았습니다.');
    return;
  }

  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;

  window.location.href = kakaoAuthUrl;
};

let memoryAccessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  memoryAccessToken = token;
};

export const getAccessToken = (): string | null => {
  return memoryAccessToken;
};
