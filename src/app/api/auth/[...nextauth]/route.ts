import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "../../../../generated/prisma";

const prisma = new PrismaClient();

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
    signIn: '/auth/login',
    error: '/auth/error',
  },
});

export { handler as GET, handler as POST };