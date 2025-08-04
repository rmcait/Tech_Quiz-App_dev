'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import {
  TargetIcon,
  TrophyIcon,
  ChartIcon,
  GoalIcon,
  BookIcon,
  AnalyticsIcon,
  FireIcon,
  StarIcon,
  CrownIcon,
  TimerIcon,
  TrendingUpIcon,
  UserIcon,
  ActivityIcon,
  CheckCircleIcon,
  ClockIcon,
  AwardIcon
} from '../ui/Icons';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserProfileModal({ isOpen, onClose }: UserProfileModalProps) {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'stats' | 'goals'>('overview');

  // モックデータ（実際のアプリではAPIから取得）
  const userStats = {
    completedQuizzes: 23,
    totalPoints: 1850,
    totalStudyTime: 45.5, // 時間
    currentStreak: 7,
    longestStreak: 15,
    averageScore: 87,
    rank: "Gold",
    level: 8,
    experience: 1850,
    nextLevelExp: 2000
  };

  const achievements = [
    { id: 1, name: "初回クイズ", description: "最初のクイズを完了", icon: TargetIcon, unlocked: true, date: "2024-01-15" },
    { id: 2, name: "連続学習", description: "7日間連続で学習", icon: FireIcon, unlocked: true, date: "2024-01-20" },
    { id: 3, name: "高得点", description: "90%以上のスコアを獲得", icon: StarIcon, unlocked: true, date: "2024-01-18" },
    { id: 4, name: "マラソン", description: "30日間連続で学習", icon: ActivityIcon, unlocked: false, date: null },
    { id: 5, name: "完璧主義者", description: "100%のスコアを獲得", icon: CrownIcon, unlocked: false, date: null },
    { id: 6, name: "エキスパート", description: "50個のクイズを完了", icon: AwardIcon, unlocked: false, date: null }
  ];

  const recentActivities = [
    { action: "ビジネス技術クイズ", score: "92%", time: "2時間前", points: "+50" },
    { action: "プロジェクトマネジメント", score: "88%", time: "1日前", points: "+45" },
    { action: "DevOps基礎", score: "85%", time: "2日前", points: "+40" },
    { action: "データ分析入門", score: "90%", time: "3日前", points: "+55" }
  ];

  const learningGoals = [
    {
      id: 1,
      title: "月間クイズ完了",
      target: 30,
      current: 23,
      unit: "個",
      icon: BookIcon,
      deadline: "2024-02-29",
      reward: "500ポイント",
      category: "学習量"
    },
    {
      id: 2,
      title: "平均スコア向上",
      target: 90,
      current: 87,
      unit: "%",
      icon: AnalyticsIcon,
      deadline: "2024-02-15",
      reward: "300ポイント",
      category: "品質"
    },
    {
      id: 3,
      title: "連続学習",
      target: 30,
      current: 7,
      unit: "日",
      icon: FireIcon,
      deadline: "2024-03-01",
      reward: "1000ポイント",
      category: "継続性"
    },
    {
      id: 4,
      title: "総学習時間",
      target: 60,
      current: 45.5,
      unit: "時間",
      icon: ClockIcon,
      deadline: "2024-02-28",
      reward: "400ポイント",
      category: "時間"
    }
  ];

  const tabs = [
    { id: 'overview', name: '概要', icon: ChartIcon },
    { id: 'achievements', name: '実績', icon: TrophyIcon },
    { id: 'stats', name: '統計', icon: AnalyticsIcon },
    { id: 'goals', name: '目標', icon: TargetIcon }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">マイページ</h2>
                <button
                  onClick={onClose}
                  className="text-white hover:text-gray-200 text-xl font-bold"
                >
                  ✕
                </button>
              </div>
              
              {/* User Info */}
              <div className="flex items-center space-x-4">
                {session?.user?.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full border-4 border-white shadow-lg bg-blue-500 flex items-center justify-center">
                    <span className="text-white text-2xl">👤</span>
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{session?.user?.name || 'ゲストユーザー'}</h3>
                  <p className="text-blue-100">{session?.user?.email || 'ログインして詳細を表示'}</p>
                  {session && (
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
                        {userStats.rank}
                      </span>
                      <span className="text-blue-100 text-sm">Level {userStats.level}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Level Progress */}
              {session && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>経験値: {userStats.experience}</span>
                    <span>次のレベルまで: {userStats.nextLevelExp - userStats.experience}</span>
                  </div>
                  <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(userStats.experience / userStats.nextLevelExp) * 100}%` }}
                      className="bg-yellow-400 h-2 rounded-full"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Content */}
            <div className="p-6 max-h-96 overflow-y-auto">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-4">
                      <div className="text-2xl font-bold">{userStats.completedQuizzes}</div>
                      <div className="text-blue-100 text-sm">完了クイズ</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-4">
                      <div className="text-2xl font-bold">{userStats.totalPoints}</div>
                      <div className="text-green-100 text-sm">獲得ポイント</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-4">
                      <div className="text-2xl font-bold">{userStats.totalStudyTime}h</div>
                      <div className="text-purple-100 text-sm">総学習時間</div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-4">
                      <div className="text-2xl font-bold">{userStats.currentStreak}</div>
                      <div className="text-orange-100 text-sm">連続日数</div>
                    </div>
                  </div>

                  {/* Learning Progress Summary */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-bold text-gray-900 mb-1">今週の学習サマリー</h5>
                        <p className="text-sm text-gray-600">前週比 +15% の成長</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">+15%</div>
                        <div className="text-xs text-green-500">成長率</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">5</div>
                        <div className="text-xs text-gray-600">今週のクイズ</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-600">8.5h</div>
                        <div className="text-xs text-gray-600">学習時間</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-orange-600">89%</div>
                        <div className="text-xs text-gray-600">平均スコア</div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activities */}
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-3">最近の活動</h4>
                    <div className="space-y-3">
                      {recentActivities.map((activity, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <BookIcon className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{activity.action}</div>
                              <div className="text-sm text-gray-500">{activity.time}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-green-600">{activity.score}</div>
                            <div className="text-sm text-green-500">{activity.points}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'achievements' && (
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">実績バッジ</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {achievements.map((achievement) => {
                      const IconComponent = achievement.icon;
                      return (
                        <motion.div
                          key={achievement.id}
                          whileHover={{ scale: 1.02 }}
                          className={`p-4 rounded-xl border-2 ${
                            achievement.unlocked
                              ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white border-yellow-300'
                              : 'bg-gray-100 text-gray-400 border-gray-200'
                          }`}
                        >
                          <div className="text-center">
                            <div className="flex justify-center mb-2">
                              <IconComponent className="w-8 h-8" />
                            </div>
                            <div className="font-bold text-sm mb-1">{achievement.name}</div>
                            <div className="text-xs opacity-80">{achievement.description}</div>
                            {achievement.unlocked && achievement.date && (
                              <div className="text-xs opacity-60 mt-2">{achievement.date}</div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'stats' && (
                <div className="space-y-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">詳細統計</h4>
                  
                  {/* Performance Stats */}
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-700">平均スコア</span>
                        <span className="text-2xl font-bold text-blue-600">{userStats.averageScore}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${userStats.averageScore}%` }}></div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-700">最高連続日数</span>
                        <span className="text-2xl font-bold text-green-600">{userStats.longestStreak}日</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-700">総学習時間</span>
                        <span className="text-2xl font-bold text-purple-600">{userStats.totalStudyTime}時間</span>
                      </div>
                    </div>
                  </div>

                  {/* Weekly Progress */}
                  <div>
                    <h5 className="font-medium text-gray-700 mb-3">今週の進捗</h5>
                    <div className="flex space-x-2">
                      {['月', '火', '水', '木', '金', '土', '日'].map((day, index) => (
                        <div
                          key={day}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                            index < 5 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                          }`}
                        >
                          {index < 5 ? '✓' : day}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Learning Trends */}
                  <div>
                    <h5 className="font-medium text-gray-700 mb-3">学習傾向分析</h5>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <TrendingUpIcon className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">学習時間</div>
                            <div className="text-sm text-gray-600">毎週 +2.5時間の成長</div>
                          </div>
                        </div>
                        <div className="text-green-600 font-bold">+12%</div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <TargetIcon className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">スコア向上</div>
                            <div className="text-sm text-gray-600">平均スコアが3%向上</div>
                          </div>
                        </div>
                        <div className="text-green-600 font-bold">+3%</div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                            <FireIcon className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">継続性</div>
                            <div className="text-sm text-gray-600">7日間連続学習中</div>
                          </div>
                        </div>
                        <div className="text-orange-600 font-bold">7日</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'goals' && (
                <div className="space-y-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">学習目標</h4>
                  
                  {/* Goals Overview */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl mb-2">🎯</div>
                      <h5 className="font-bold text-gray-900 mb-1">今月の目標達成率</h5>
                      <div className="text-3xl font-bold text-blue-600 mb-2">68%</div>
                      <p className="text-sm text-gray-600">4つの目標中、2つが進行中</p>
                    </div>
                  </div>

                  {/* Learning Goals */}
                  <div className="space-y-4">
                    {learningGoals.map((goal, index) => {
                      const progress = Math.min((goal.current / goal.target) * 100, 100);
                      const isCompleted = goal.current >= goal.target;
                      const isOverdue = new Date(goal.deadline) < new Date();
                      
                      return (
                        <motion.div
                          key={goal.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`p-4 rounded-xl border-2 ${
                            isCompleted
                              ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
                              : isOverdue
                              ? 'bg-gradient-to-r from-red-50 to-pink-50 border-red-200'
                              : 'bg-white border-gray-200'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                isCompleted ? 'bg-green-500 text-white' : 'bg-blue-100 text-blue-600'
                              }`}>
                                {(() => {
                                  const IconComponent = goal.icon;
                                  return <IconComponent className="w-5 h-5" />;
                                })()}
                              </div>
                              <div>
                                <h6 className="font-bold text-gray-900">{goal.title}</h6>
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                    {goal.category}
                                  </span>
                                  {isOverdue && (
                                    <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                                      期限切れ
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-gray-900">
                                {goal.current}/{goal.target}{goal.unit}
                              </div>
                              <div className="text-sm text-green-600 font-medium">
                                {goal.reward}
                              </div>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="mb-3">
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                              <span>進捗: {Math.round(progress)}%</span>
                              <span>期限: {goal.deadline}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                className={`h-2 rounded-full ${
                                  isCompleted ? 'bg-green-500' : isOverdue ? 'bg-red-500' : 'bg-blue-500'
                                }`}
                              />
                            </div>
                          </div>

                          {/* Status */}
                          <div className="flex items-center justify-between">
                            <div className="text-xs text-gray-500">
                              {isCompleted ? (
                                <span className="text-green-600 font-medium">🎉 目標達成！</span>
                              ) : isOverdue ? (
                                <span className="text-red-600 font-medium">⚠️ 期限切れ</span>
                              ) : (
                                <span className="text-blue-600 font-medium">📈 進行中</span>
                              )}
                            </div>
                            {!isCompleted && (
                              <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 transition-colors">
                                詳細を見る
                              </button>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Add New Goal */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-xl">+</span>
                      <span>新しい目標を追加</span>
                    </div>
                  </motion.button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-4 bg-gray-50">
              <div className="flex justify-between items-center">
                {session ? (
                  <button
                    onClick={() => signOut()}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    ログアウト
                  </button>
                ) : (
                  <button
                    onClick={() => window.location.href = '/auth/login'}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    ログイン
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  閉じる
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 