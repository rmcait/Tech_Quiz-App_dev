'use client'

import { signOut, useSession } from 'next-auth/react'
import { GoogleSignInButton } from '../../../components/auth/GoogleSignInButton'

export default function LoginPage() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                ようこそ！
              </h2>
              <p className="text-gray-600 mb-6">
                {session.user?.name}さんがログインしています
              </p>
              <button
                onClick={() => signOut()}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
              >
                ログアウト
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100">
            <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            アカウントにログイン
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            アプリケーションを使用するにはログインしてください
          </p>
        </div>
        
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          <div className="space-y-6">
            <div>
              <GoogleSignInButton />
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  または
                </span>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-xs text-gray-500">
                ログインすることで、当社の
                <a href="#" className="text-blue-600 hover:text-blue-500">利用規約</a>
                と
                <a href="#" className="text-blue-600 hover:text-blue-500">プライバシーポリシー</a>
                に同意したことになります。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}