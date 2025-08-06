'use client';

import React, { useState, useEffect } from 'react';
import { QuizHistory, QuizHistoryManager } from '@/data/quizData';

interface QuizHistoryProps {
  onViewHistory: (history: QuizHistory) => void;
}

// SVGアイコンコンポーネント
const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const TrophyIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

const TargetIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const BookOpenIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const AwardIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

export default function QuizHistoryComponent({ onViewHistory }: QuizHistoryProps) {
  const [histories, setHistories] = useState<QuizHistory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');

  useEffect(() => {
    setHistories(QuizHistoryManager.getQuizHistories());
  }, []);

  // カテゴリとジャンルのフィルタリング
  const filteredHistories = histories.filter(history => {
    if (selectedCategory !== 'all' && history.category !== selectedCategory) {
      return false;
    }
    if (selectedGenre !== 'all' && history.genre !== selectedGenre) {
      return false;
    }
    return true;
  });

  // ユニークなカテゴリとジャンルを取得
  const categories = Array.from(new Set(histories.map(h => h.category)));
  const genres = Array.from(new Set(
    histories
      .filter(h => selectedCategory === 'all' || h.category === selectedCategory)
      .map(h => h.genre)
  ));

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'general':
        return '一般教養';
      case 'specialized':
        return '専門';
      default:
        return category;
    }
  };

  const getGenreName = (genre: string) => {
    const genreMap: { [key: string]: string } = {
      'current-events': '時事問題',
      'tech-trends': 'テクノロジートレンド',
      'history': '歴史',
      'ai-ml': 'AI・機械学習',
      'cloud-native': 'クラウドネイティブ',
      'programming': 'プログラミング',
      'database': 'データベース',
      'security': 'セキュリティ'
    };
    return genreMap[genre] || genre;
  };

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'bg-green-100 text-green-800 border-green-200';
    if (percentage >= 60) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  // 統計計算
  const totalQuizzes = filteredHistories.length;
  const averageScore = totalQuizzes > 0 
    ? filteredHistories.reduce((sum, h) => sum + (h.score / h.totalQuestions), 0) / totalQuizzes 
    : 0;
  const bestScore = totalQuizzes > 0 
    ? Math.max(...filteredHistories.map(h => (h.score / h.totalQuestions) * 100)) 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            クイズ履歴
          </h1>
          <p className="text-xl text-gray-600">
            過去に挑戦したクイズの結果を確認できます
          </p>
        </div>

        {/* 統計情報 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <BookOpenIcon className="w-8 h-8 text-indigo-600 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{totalQuizzes}</div>
                <div className="text-sm text-gray-600">挑戦したクイズ</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <TargetIcon className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {(averageScore * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">平均正答率</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <TrophyIcon className="w-8 h-8 text-yellow-600 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {bestScore.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">最高得点</div>
              </div>
            </div>
          </div>
        </div>

        {/* フィルター */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">フィルター</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                カテゴリ
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedGenre('all');
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">すべて</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {getCategoryName(category)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ジャンル
              </label>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">すべて</option>
                {genres.map(genre => (
                  <option key={genre} value={genre}>
                    {getGenreName(genre)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 履歴一覧 */}
        {filteredHistories.length === 0 ? (
          <div className="text-center py-16">
            <AwardIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              履歴がありません
            </h3>
            <p className="text-gray-500">
              クイズに挑戦すると、ここに履歴が表示されます
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredHistories
              .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
              .map((history) => (
                <div
                  key={history.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100"
                  onClick={() => onViewHistory(history)}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="text-xl font-bold text-gray-900 mr-3">
                            {history.quizSetTitle}
                          </h3>
                          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {getCategoryName(history.category)} / {getGenreName(history.genre)}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-600">
                          <div className="flex items-center">
                            <CalendarIcon className="w-4 h-4 mr-1" />
                            {new Date(history.completedAt).toLocaleDateString('ja-JP')}
                          </div>
                          <div className="flex items-center">
                            <ClockIcon className="w-4 h-4 mr-1" />
                            {new Date(history.completedAt).toLocaleTimeString('ja-JP', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </div>
                          <div className="flex items-center">
                            <BookOpenIcon className="w-4 h-4 mr-1" />
                            {history.totalQuestions}問
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        {/* スコア表示 */}
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${getScoreColor(history.score, history.totalQuestions)}`}>
                            {history.score}/{history.totalQuestions}
                          </div>
                          <div className={`text-sm px-2 py-1 rounded border ${getScoreBadgeColor(history.score, history.totalQuestions)}`}>
                            {((history.score / history.totalQuestions) * 100).toFixed(1)}%
                          </div>
                        </div>

                        {/* 矢印アイコン */}
                        <ChevronRightIcon className="w-6 h-6 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* ページネーション（将来的に追加可能） */}
        {filteredHistories.length > 10 && (
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              {filteredHistories.length}件の履歴を表示中
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
