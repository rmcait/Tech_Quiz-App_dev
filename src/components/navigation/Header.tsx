'use client'

import { useSession, signOut } from 'next-auth/react'
import { GoogleSignInButton } from '../auth/GoogleSignInButton'

export function Header() {
  const { data: session, status } = useSession()

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">TechAlpha</h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="/" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              ホーム
            </a>
            <a href="/profile" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              プロフィール
            </a>
          </nav>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            ) : session ? (
              <div className="flex items-center space-x-3">
                {session.user?.image && (
                  <img
                    className="h-8 w-8 rounded-full"
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                  />
                )}
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">
                    {session.user?.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {session.user?.email}
                  </p>
                </div>
                <button
                  onClick={() => signOut()}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  ログアウト
                </button>
              </div>
            ) : (
              <GoogleSignInButton className="w-auto px-4 py-2">
                ログイン
              </GoogleSignInButton>
            )}
          </div>
        </div>
      </div>
    </header>
  )
} 