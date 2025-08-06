'use client';

import React from 'react';
import { QuizSet, getQuizSetsByGenre } from '@/data/quizData';

interface QuizSetSelectorProps {
  genre: string;
  genreName: string;
  onSelectQuizSet: (quizSet: QuizSet) => void;
  onBack: () => void;
}

// SVGアイコンコンポーネント
const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const BookOpenIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const TrophyIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

export default function QuizSetSelector({ 
  genre, 
  genreName, 
  onSelectQuizSet, 
  onBack 
}: QuizSetSelectorProps) {
  const quizSets = getQuizSetsByGenre(genre);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return '初級';
      case 'intermediate':
        return '中級';
      case 'advanced':
        return '上級';
      default:
        return difficulty;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="mb-4 flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            ジャンル選択に戻る
          </button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {genreName}
            </h1>
            <p className="text-xl text-gray-600">
              クイズセットを選択してください
            </p>
          </div>
        </div>

        {/* クイズセット一覧 */}
        {quizSets.length === 0 ? (
          <div className="text-center py-16">
            <BookOpenIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              クイズセットが見つかりません
            </h3>
            <p className="text-gray-500">
              このジャンルのクイズセットは現在準備中です
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizSets.map((quizSet) => (
              <div
                key={quizSet.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-100"
                onClick={() => onSelectQuizSet(quizSet)}
              >
                <div className="p-6">
                  {/* ヘッダー部分 */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                        {quizSet.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                        {quizSet.description}
                      </p>
                    </div>
                    <TrophyIcon className="w-6 h-6 text-yellow-500 ml-2 flex-shrink-0" />
                  </div>

                  {/* 難易度バッジ */}
                  <div className="mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(quizSet.difficulty)}`}>
                      <StarIcon className="w-4 h-4 mr-1" />
                      {getDifficultyText(quizSet.difficulty)}
                    </span>
                  </div>

                  {/* 詳細情報 */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <BookOpenIcon className="w-4 h-4 mr-2 text-indigo-500" />
                      <span>{quizSet.questions.length}問</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <UserIcon className="w-4 h-4 mr-2 text-green-500" />
                      <span>作成者: {quizSet.createdBy}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CalendarIcon className="w-4 h-4 mr-2 text-blue-500" />
                      <span>{quizSet.createdAt}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <ClockIcon className="w-4 h-4 mr-2 text-purple-500" />
                      <span>約{Math.ceil(quizSet.questions.length * 1.5)}分</span>
                    </div>
                  </div>

                  {/* アクションボタン */}
                  <div className="pt-4 border-t border-gray-100">
                    <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center">
                      <BookOpenIcon className="w-5 h-5 mr-2" />
                      クイズを開始
                    </button>
                  </div>
                </div>

                {/* ホバー効果のためのオーバーレイ */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-purple-600/5 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>
        )}

        {/* 統計情報 */}
        {quizSets.length > 0 && (
          <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {genreName} の統計
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">
                  {quizSets.length}
                </div>
                <div className="text-sm text-gray-600">クイズセット</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {quizSets.reduce((total, set) => total + set.questions.length, 0)}
                </div>
                <div className="text-sm text-gray-600">総問題数</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {quizSets.filter(set => set.difficulty === 'beginner').length}
                </div>
                <div className="text-sm text-gray-600">初級セット</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {quizSets.filter(set => set.difficulty === 'advanced').length}
                </div>
                <div className="text-sm text-gray-600">上級セット</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
