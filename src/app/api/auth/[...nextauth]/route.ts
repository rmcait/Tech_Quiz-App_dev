import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "../../../../generated/prisma";

const prisma = new PrismaClient();

// 有効な企業コードのリスト（実際の実装ではデータベースから取得）
const VALID_COMPANY_CODES = [
  "TECH001",
  "TECH002", 
  "TECH003",
  "ALPHA001",
  "ALPHA002",
  "OMEGA001",
  "OMEGA002",
  "DEMO001"
];

// 環境変数の検証
const requiredEnvVars = {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
};

// 開発環境でのデフォルト値設定
const isDevelopment = process.env.NODE_ENV === 'development';

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: requiredEnvVars.GOOGLE_CLIENT_ID || (isDevelopment ? 'dummy-client-id' : ''),
      clientSecret: requiredEnvVars.GOOGLE_CLIENT_SECRET || (isDevelopment ? 'dummy-client-secret' : ''),
    }),
  ],
  secret: requiredEnvVars.NEXTAUTH_SECRET || (isDevelopment ? 'dummy-secret' : ''),
  debug: isDevelopment,
  pages: {
    signIn: '/',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      // ユーザー情報をトークンに追加
      if (user) {
        // AlphaOmegaという名前のユーザーは特別に管理者として扱う
        const isAlphaOmega = user.name === "AlphaOmega";
        const isAdmin = user.email === "admin@company.com" || 
                       user.email === "tanaka@company.com" ||
                       user.email === "manager@company.com" ||
                       isAlphaOmega;
        
        token.role = isAdmin ? "ADMIN" : "STAFF";
        token.isAlphaOmega = isAlphaOmega;
      }
      return token;
    },
    async session({ session, token }) {
      // セッションに役割情報を追加
      if (token) {
        session.user.role = token.role;
        session.user.isAlphaOmega = token.isAlphaOmega;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      // 企業コードのバリデーション
      if (account?.state) {
        const companyCode = account.state;
        const isValidCode = VALID_COMPANY_CODES.includes(companyCode.toUpperCase());
        
        if (!isValidCode) {
          console.log("❌ Invalid company code:", companyCode);
          return false; // ログインを拒否
        }
        
        console.log("✅ Valid company code:", companyCode);
      } else {
        console.log("❌ No company code provided");
        return false; // 企業コードがない場合はログインを拒否
      }

      // サインイン時の処理
      // AlphaOmegaという名前のユーザーは特別に管理者権限を付与
      if (user.name === "AlphaOmega") {
        try {
          await prisma.user.upsert({
            where: { email: user.email! },
            update: { 
              name: user.name,
              isAdmin: true,
              emailVerified: new Date()
            },
            create: {
              email: user.email!,
              name: user.name,
              isAdmin: true,
              emailVerified: new Date()
            },
          });
          console.log("✅ AlphaOmega user created/updated with admin privileges");
        } catch (error) {
          console.error("❌ AlphaOmega user creation error:", error);
        }
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      // ログイン後のリダイレクト処理
      // AlphaOmegaという名前のユーザーは管理者ダッシュボードに直接リダイレクト
      if (url.startsWith("/")) {
        // セッションからユーザー情報を取得するため、一時的にホームページにリダイレクト
        // 実際のリダイレクトはクライアントサイドで処理
        return `${baseUrl}/dashboard`;
      }
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
});

export { handler as GET, handler as POST };