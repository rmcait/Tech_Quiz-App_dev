'use client'

import { useSession, signOut } from 'next-auth/react'
import { GoogleSignInButton } from '../auth/GoogleSignInButton'
import { UserProfileModal } from '../user/UserProfileModal'
import { useState } from 'react'

export function Header() {
  const { data: session, status } = useSession()
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)

  // デバッグ用: セッション状態をコンソールに出力
  console.log('Header - Session status:', status)
  console.log('Header - Session data:', session)

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
            <a href="/dashboard" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              ダッシュボード
            </a>
            <a href="/profile" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              プロフィール
            </a>
          </nav>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsProfileModalOpen(true)}
                  className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200"
                >
                  {session?.user?.image ? (
                    <img
                      className="h-8 w-8 rounded-full border-2 border-blue-500"
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                      {session?.user?.name?.charAt(0) || '👤'}
                    </div>
                  )}
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-gray-900">
                      {session?.user?.name || 'マイページ'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {session ? 'マイページを見る' : 'ログインして詳細を見る'}
                    </p>
                  </div>
                  <div className="text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </header>
  )
} 