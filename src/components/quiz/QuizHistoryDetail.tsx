'use client';

import React from 'react';
import { QuizHistory, getQuizSetById } from '@/data/quizData';

interface QuizHistoryDetailProps {
  history: QuizHistory;
  onBack: () => void;
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

const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const XCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const BookOpenIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

export default function QuizHistoryDetail({ history, onBack }: QuizHistoryDetailProps) {
  const quizSet = getQuizSetById(history.quizSetId);

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

  const correctAnswers = history.answers.filter(answer => answer.isCorrect).length;
  const averageTime = history.answers.reduce((sum, answer) => sum + answer.timeSpent, 0) / history.answers.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="mb-4 flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            履歴一覧に戻る
          </button>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {history.quizSetTitle}
                </h1>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="bg-gray-100 px-3 py-1 rounded">
                    {getCategoryName(history.category)} / {getGenreName(history.genre)}
                  </span>
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
                </div>
              </div>
              
              <div className="text-right">
                <div className={`text-4xl font-bold ${getScoreColor(history.score, history.totalQuestions)}`}>
                  {history.score}/{history.totalQuestions}
                </div>
                <div className={`text-lg px-3 py-1 rounded border ${getScoreBadgeColor(history.score, history.totalQuestions)}`}>
                  {((history.score / history.totalQuestions) * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 統計サマリー */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex items-center">
              <TargetIcon className="w-6 h-6 text-green-600 mr-2" />
              <div>
                <div className="text-xl font-bold text-gray-900">{correctAnswers}</div>
                <div className="text-sm text-gray-600">正解数</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex items-center">
              <XCircleIcon className="w-6 h-6 text-red-600 mr-2" />
              <div>
                <div className="text-xl font-bold text-gray-900">{history.totalQuestions - correctAnswers}</div>
                <div className="text-sm text-gray-600">不正解数</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex items-center">
              <ClockIcon className="w-6 h-6 text-blue-600 mr-2" />
              <div>
                <div className="text-xl font-bold text-gray-900">{averageTime.toFixed(1)}秒</div>
                <div className="text-sm text-gray-600">平均回答時間</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex items-center">
              <TrophyIcon className="w-6 h-6 text-yellow-600 mr-2" />
              <div>
                <div className="text-xl font-bold text-gray-900">
                  {((history.score / history.totalQuestions) * 100).toFixed(0)}%
                </div>
                <div className="text-sm text-gray-600">正答率</div>
              </div>
            </div>
          </div>
        </div>

        {/* 問題別結果 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <BookOpenIcon className="w-6 h-6 mr-2" />
            問題別結果
          </h2>
          
          <div className="space-y-4">
            {history.answers.map((answer, index) => {
              const question = quizSet?.questions.find(q => q.id === answer.questionId);
              if (!question) return null;

              return (
                <div
                  key={answer.questionId}
                  className={`border rounded-lg p-4 ${
                    answer.isCorrect 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-medium mr-3">
                        問題 {index + 1}
                      </span>
                      {answer.isCorrect ? (
                        <CheckCircleIcon className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircleIcon className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div className="text-sm text-gray-600">
                      回答時間: {answer.timeSpent}秒
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {question.question}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {question.options.map((option, optionIndex) => {
                      const isSelected = answer.selectedAnswer === optionIndex;
                      const isCorrect = question.correctAnswer === optionIndex;
                      
                      let optionClass = 'p-3 rounded border text-sm';
                      
                      if (isSelected && answer.isCorrect) {
                        // 選択した答えが正解
                        optionClass += ' bg-green-100 border-green-300 text-green-800';
                      } else if (isSelected && !answer.isCorrect) {
                        // 選択した答えが不正解
                        optionClass += ' bg-red-100 border-red-300 text-red-800';
                      } else {
                        // 選択していない選択肢
                        optionClass += ' bg-gray-50 border-gray-200 text-gray-700';
                      }
                      
                      return (
                        <div key={optionIndex} className={optionClass}>
                          <div className="flex items-center">
                            <span className="font-medium mr-2">
                              {String.fromCharCode(65 + optionIndex)}.
                            </span>
                            {option}
                            {isSelected && (
                              <span className="ml-auto text-xs font-medium">
                                選択
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* 正解は表示しない（要求通り） */}
                  <div className="mt-3 text-sm text-gray-600">
                    <strong>結果:</strong> {answer.isCorrect ? '正解' : '不正解'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* アクションボタン */}
        <div className="mt-8 text-center">
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
          >
            履歴一覧に戻る
          </button>
        </div>
      </div>
    </div>
  );
}
