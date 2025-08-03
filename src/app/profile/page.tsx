'use client'

import { useSession } from 'next-auth/react'
import { Header } from '../../components/navigation/Header'
import { useState } from 'react'

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || ''
  })

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              ログインが必要です
            </h1>
            <p className="text-gray-600 mb-6">
              プロフィールを表示するにはログインしてください
            </p>
            <a
              href="/auth/login"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              ログインページへ
            </a>
          </div>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'プロフィール更新に失敗しました')
      }

      const result = await response.json()
      
      // セッションを更新（NextAuthのセッション更新が必要）
      // 実際の実装では、NextAuthのセッション更新APIを呼び出すか、
      // ページをリロードしてセッションを再取得する
      
      setIsEditing(false)
      alert('プロフィールを更新しました')
      
      // ページをリロードしてセッションを更新
      window.location.reload()
      
    } catch (error) {
      console.error('プロフィール更新エラー:', error)
      alert(error instanceof Error ? error.message : 'プロフィール更新に失敗しました')
    }
  }

  const handleCancel = () => {
    setFormData({
      name: session.user?.name || '',
      email: session.user?.email || ''
    })
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* ページヘッダー */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">プロフィール</h1>
            <p className="mt-2 text-gray-600">
              アカウント情報を管理できます
            </p>
          </div>

          {/* プロフィールカード */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  基本情報
                </h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    編集
                  </button>
                )}
              </div>
            </div>

            <div className="px-6 py-6">
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      名前
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      メールアドレス
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      disabled
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-500 sm:text-sm"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      メールアドレスは変更できません
                    </p>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      キャンセル
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      保存
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center space-x-6">
                    {session.user?.image && (
                      <img
                        className="h-20 w-20 rounded-full"
                        src={session.user.image}
                        alt={session.user.name || 'User'}
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">
                        {session.user?.name}
                      </h3>
                      <p className="text-gray-500">
                        {session.user?.email}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">名前</dt>
                      <dd className="mt-1 text-sm text-gray-900">{session.user?.name}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">メールアドレス</dt>
                      <dd className="mt-1 text-sm text-gray-900">{session.user?.email}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">アカウント作成日</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        未確認
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">認証プロバイダー</dt>
                      <dd className="mt-1 text-sm text-gray-900">Google</dd>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* セキュリティセクション */}
          <div className="mt-8 bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                セキュリティ
              </h2>
            </div>
            <div className="px-6 py-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">パスワード</h3>
                    <p className="text-sm text-gray-500">
                      Googleアカウントで管理されています
                    </p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    安全
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">2段階認証</h3>
                    <p className="text-sm text-gray-500">
                      Googleアカウントで管理されています
                    </p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    有効
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* アカウントアクション */}
          <div className="mt-8 bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                アカウントアクション
              </h2>
            </div>
            <div className="px-6 py-6">
              <div className="space-y-4">
                <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">データエクスポート</h3>
                      <p className="text-sm text-gray-500">
                        アカウントデータをダウンロード
                      </p>
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </button>
                
                <button className="w-full text-left px-4 py-3 border border-red-300 rounded-md hover:bg-red-50 transition-colors duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-red-900">アカウント削除</h3>
                      <p className="text-sm text-red-500">
                        アカウントを完全に削除（取り消し不可）
                      </p>
                    </div>
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 