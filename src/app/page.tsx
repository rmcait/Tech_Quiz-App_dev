"use client";

import { useSession } from "next-auth/react";
import { Header } from "../components/navigation/Header";

export default function HomePage() {
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {status === 'loading' ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : session ? (
          <div className="text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                ようこそ、{session.user?.name}さん！
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                TechAlpha アプリケーションへようこそ
              </p>
              
              <div className="bg-white shadow rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  ユーザー情報
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-center space-x-4">
                    {session.user?.image && (
                      <img
                        className="h-16 w-16 rounded-full"
                        src={session.user.image}
                        alt={session.user.name || 'User'}
                      />
                    )}
                    <div className="text-left">
                      <p className="text-lg font-medium text-gray-900">
                        名前: {session.user?.name}
                      </p>
                      <p className="text-gray-600">
                        メール: {session.user?.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    プロフィール
                  </h3>
                  <p className="text-gray-600 mb-4">
                    プロフィール情報を編集できます
                  </p>
                  <a
                    href="/profile"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    プロフィールを見る
                  </a>
                </div>
                
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    ビジネス技術クイズ
                  </h3>
                  <p className="text-gray-600 mb-4">
                    技術・ビジネスに関する10問のクイズに挑戦できます
                  </p>
                  <a
                    href="/quiz"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  >
                    クイズに挑戦
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                TechAlpha へようこそ
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                アプリケーションを使用するにはログインしてください
              </p>
              
              <div className="bg-white shadow rounded-lg p-8 max-w-md mx-auto">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  ログイン
                </h2>
                <p className="text-gray-600 mb-6">
                  アカウントにログインして、すべての機能にアクセスできます。
                </p>
                <a
                  href="/auth/login"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  ログインページへ
                </a>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}