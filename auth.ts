import NextAuth from "next-auth";
import { SignJWT } from "jose";
import GoogleProvider from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        if (!user) throw new Error("유저 정보 없음 (callback/jwt)");
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signin`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: user.name ?? "",
              email: user.email ?? "",
              image: user.image ?? "",
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            }),
          });

          if (!res.ok) throw new Error(`백엔드 로그인 실패: ${res.status}`);
          const { id, name, image } = await res.json();
          token.sub = id;
          token.name = name;
          token.picture = image;
        } catch (error) {
          console.error("JWT 콜백 백엔드 인증 에러: ", error);
          throw error;
        }
      }
      return token;
    },
    async session({ token, session }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.name = token.name;
        session.user.image = token.picture;

        const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
        const authToken = await new SignJWT({ sub: token.sub as string })
          .setProtectedHeader({ alg: "HS256" })
          .setIssuedAt()
          .setExpirationTime("1d")
          .sign(secret);
        session.accessToken = authToken;
      }
      return session;
    },
  },
});
