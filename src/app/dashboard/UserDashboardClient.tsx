"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useCallback } from "react";
import { CorporateStoryView } from "@/components/quiz/CorporateStoryView";

interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
  isAlphaOmega?: boolean;
}

interface UserDashboardClientProps {
  user: User;
}

export function UserDashboardClient({ user }: UserDashboardClientProps) {
  const isAlphaOmega = user.isAlphaOmega;
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [isStoryOpen, setIsStoryOpen] = useState(false);

  // 企業ストーリーデータ
  const corporateStories = [
    {
      id: "shops-1",
      company: "shops",
      logo: "m",
      banner: "shops-banner",
      title: "Shops 新商品クイズ",
      description: "最新の商品知識をテストして、ショッピングの達人になろう！",
      quizType: "新商品クイズ",
      timePosted: "2時間前",
      isNew: true
    },
    {
      id: "rakuten-1",
      company: "rakuten",
      logo: "R",
      banner: "rakuten-banner",
      title: "Rakuten ポイントクイズ",
      description: "楽天ポイントの使い方とお得な情報を学ぼう！",
      quizType: "ポイントクイズ",
      timePosted: "4時間前"
    },
    {
      id: "amazon-1",
      company: "amazon",
      logo: "a",
      banner: "amazon-banner",
      title: "Amazon ECクイズ",
      description: "Eコマースの基礎知識とAmazonのサービスを理解しよう！",
      quizType: "ECクイズ",
      timePosted: "6時間前"
    },
    {
      id: "ca-1",
      company: "ca_tech",
      logo: "CA",
      banner: "ca-banner",
      title: "CA テッククイズ",
      description: "最新のテクノロジートレンドと技術知識をテスト！",
      quizType: "テッククイズ",
      timePosted: "1時間前",
      isLive: true
    }
  ];

  const handleStoryClick = (story: any) => {
    setSelectedStory(story);
    setIsStoryOpen(true);
  };

  const handleCloseStory = useCallback(() => {
    setIsStoryOpen(false);
    setSelectedStory(null);
  }, []);

  const handleStartQuiz = useCallback((storyId: string) => {
    console.log(`Starting quiz for story: ${storyId}`);
    // ここでクイズページに遷移する処理を追加
    handleCloseStory();
  }, [handleCloseStory]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" as const }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const stats = [
    { title: "完了したクイズ", value: "3", icon: "📚", color: "bg-blue-500" },
    { title: "平均スコア", value: "85%", icon: "📊", color: "bg-green-500" },
    { title: "学習時間", value: "2.5時間", icon: "⏱️", color: "bg-purple-500" },
    { title: "獲得ポイント", value: "1,250", icon: "🏆", color: "bg-yellow-500" },
  ];

  // 連続解答日数と皆勤ボーナスデータ
  const streakData = {
    currentStreak: 7,
    longestStreak: 15,
    totalDays: 25,
    bonusPoints: 500,
    nextBonus: 1000,
    daysToNextBonus: 3,
    weeklyProgress: 5 // 今週完了した日数（月〜金の5日間）
  };

  // デバッグ用: 週間プログレスの値を確認
  console.log('Weekly Progress Debug:', {
    currentStreak: streakData.currentStreak,
    weeklyProgress: streakData.weeklyProgress,
    calculation: streakData.currentStreak % 7
  });

  const recentActivities = [
    { action: "ビジネス技術クイズを完了", score: "90%", time: "2時間前", icon: "✅" },
    { action: "プロジェクトマネジメントクイズを完了", score: "85%", time: "1日前", icon: "📋" },
    { action: "DevOps基礎クイズを完了", score: "80%", time: "3日前", icon: "⚙️" },
  ];

  const availableQuizzes = [
    { 
      title: "ビジネス技術クイズ", 
      description: "プロジェクトマネジメント、アジャイル開発、データベースなど",
      questions: 10,
      difficulty: "初級",
      icon: "💼",
      color: "from-blue-500 to-blue-600"
    },
    { 
      title: "プロジェクトマネジメント", 
      description: "PMBOK、アジャイル、スクラム、リスク管理など",
      questions: 15,
      difficulty: "中級",
      icon: "📋",
      color: "from-green-500 to-green-600"
    },
    { 
      title: "DevOps基礎", 
      description: "CI/CD、コンテナ、クラウド、セキュリティなど",
      questions: 12,
      difficulty: "中級",
      icon: "⚙️",
      color: "from-purple-500 to-purple-600"
    },
    { 
      title: "データ分析入門", 
      description: "統計、機械学習、データ可視化など",
      questions: 8,
      difficulty: "初級",
      icon: "📊",
      color: "from-orange-500 to-orange-600"
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >


        {/* Compact & Readable Streak & Bonus Section */}
        <motion.div 
          variants={cardVariants}
          className="bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 rounded-2xl p-5 shadow-xl border border-orange-300"
        >
          {/* Main Content Row */}
          <div className="flex items-center justify-between mb-4">
            {/* Left: Streak Info with Better Typography */}
            <div className="flex items-center space-x-4">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 10,
                  delay: 0.2
                }}
                className="w-12 h-12 bg-white bg-opacity-25 rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-xl">🔥</span>
              </motion.div>
              <div className="space-y-1">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl font-bold text-white drop-shadow-sm"
                >
                  {streakData.currentStreak}日連続
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-orange-100 text-sm font-medium"
                >
                  最高記録: {streakData.longestStreak}日
                </motion.div>
              </div>
            </div>
            
            {/* Right: Bonus Points with Enhanced Visibility */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center"
            >
              <div className="bg-white bg-opacity-25 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-white border-opacity-30">
                <div className="text-lg font-bold text-white drop-shadow-sm">+{streakData.bonusPoints}</div>
                <div className="text-orange-100 text-sm font-medium">ボーナス</div>
              </div>
            </motion.div>
          </div>

          {/* Weekly Progress with Better Spacing */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="mb-4"
          >
            <div className="flex justify-between items-center">
              <span className="text-white text-sm font-medium">今週の進捗:</span>
              <div className="flex space-x-2">
                {['月', '火', '水', '木', '金', '土', '日'].map((day, index) => (
                  <motion.div
                    key={day}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.2 + index * 0.05 }}
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-md ${
                      index < streakData.weeklyProgress 
                        ? 'bg-white text-red-600 shadow-lg drop-shadow-sm font-black' 
                        : 'bg-white bg-opacity-20 text-white border border-white border-opacity-30'
                    }`}
                  >
                    {index < streakData.weeklyProgress ? '✓' : day}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Progress Bar with Better Visibility */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mb-4"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-white text-sm font-medium">次のボーナスまで</span>
              <span className="text-white text-sm font-bold">{streakData.daysToNextBonus}/10日</span>
            </div>
            <div className="w-full bg-white bg-opacity-20 rounded-full h-3 shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((10 - streakData.daysToNextBonus) / 10) * 100}%` }}
                transition={{ duration: 1.5, delay: 1.6 }}
                className="bg-gradient-to-r from-yellow-300 to-orange-400 h-3 rounded-full shadow-sm"
              />
            </div>
            <div className="text-center mt-2">
              <p className="text-orange-100 text-sm font-medium">
                あと{streakData.daysToNextBonus}日で{streakData.nextBonus}ポイント獲得！
              </p>
            </div>
          </motion.div>

          {/* Enhanced Action Button */}
          <motion.button
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-white text-orange-500 py-3 rounded-xl font-bold text-base shadow-lg hover:bg-orange-50 hover:shadow-xl transition-all duration-200 border-2 border-white border-opacity-30"
          >
            今日も学習する
          </motion.button>
        </motion.div>

        {/* Corporate Event Quizzes - Authentic Instagram Stories Style */}
        <motion.div 
          variants={cardVariants}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">🏢 企業イベントクイズ</h2>
            <span className="text-sm text-gray-500">パートナー企業からの特別クイズ</span>
          </div>
          
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {/* Your Story */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-shrink-0 cursor-pointer group"
            >
              <div className="relative">
                {/* Story Ring - Orange to Purple Gradient */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-purple-500 p-0.5 mb-2">
                  <div className="w-full h-full rounded-full bg-white p-1">
                    <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 text-lg">👤</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium text-gray-900">Your Story</p>
                </div>
              </div>
            </motion.div>

            {/* Shops Story */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-shrink-0 cursor-pointer group"
              onClick={() => handleStoryClick(corporateStories[0])}
            >
              <div className="relative">
                {/* Story Ring - Orange to Purple Gradient */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-purple-500 p-0.5 mb-2">
                  <div className="w-full h-full rounded-full bg-white p-1">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center relative">
                      {/* Red Cube with 'm' */}
                      <div className="w-6 h-6 bg-red-600 rounded-sm transform rotate-12 relative">
                        <div className="absolute inset-0 bg-red-500 rounded-sm"></div>
                        <div className="absolute inset-0 bg-red-400 rounded-sm transform translate-x-0.5 -translate-y-0.5"></div>
                        <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs">m</span>
                      </div>
                      {/* Blue Circle */}
                      <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-cyan-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium text-gray-900">shops</p>
                </div>
                {/* New Badge */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-pink-500 rounded-sm flex items-center justify-center">
                  <span className="text-white text-xs font-bold">NEW</span>
                </div>
              </div>
            </motion.div>

            {/* Rakuten Story */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-shrink-0 cursor-pointer group"
              onClick={() => handleStoryClick(corporateStories[1])}
            >
              <div className="relative">
                {/* Story Ring - Purple Gradient */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 p-0.5 mb-2">
                  <div className="w-full h-full rounded-full bg-white p-1">
                    <div className="w-full h-full rounded-full bg-red-600 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-white font-bold text-xs">Rakuten</div>
                        <div className="w-6 h-0.5 bg-white rounded-full mt-1 transform rotate-12"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium text-gray-900">rakuten</p>
                </div>
              </div>
            </motion.div>

            {/* Amazon Story */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-shrink-0 cursor-pointer group"
              onClick={() => handleStoryClick(corporateStories[2])}
            >
              <div className="relative">
                {/* Story Ring - Orange to Purple Gradient */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-purple-500 p-0.5 mb-2">
                  <div className="w-full h-full rounded-full bg-white p-1">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-gray-300 font-bold text-xs">amazon</div>
                        <div className="w-5 h-0.5 bg-orange-500 rounded-full mt-1 transform -rotate-6"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium text-gray-900">amazon</p>
                </div>
              </div>
            </motion.div>

            {/* CA Story */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-shrink-0 cursor-pointer group"
              onClick={() => handleStoryClick(corporateStories[3])}
            >
              <div className="relative">
                {/* Story Ring - Purple Gradient */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 p-0.5 mb-2">
                  <div className="w-full h-full rounded-full bg-white p-1">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center">
                      <div className="flex items-center">
                        <div className="w-5 h-5 bg-lime-400 rounded-full flex items-center justify-center text-white font-bold text-xs">C</div>
                        <div className="w-5 h-5 bg-green-700 rounded-full flex items-center justify-center text-white font-bold text-xs -ml-1">A</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium text-gray-900">ca_tech</p>
                </div>
                {/* Live Badge */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-pink-500 rounded-sm flex items-center justify-center animate-pulse">
                  <span className="text-white text-xs font-bold">LIVE</span>
                </div>
              </div>
            </motion.div>

            {/* Add Story Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-shrink-0 cursor-pointer group"
            >
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gray-200 p-0.5 mb-2">
                  <div className="w-full h-full rounded-full bg-white p-1">
                    <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
                      <div className="text-gray-400 text-xl">+</div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium text-gray-500">追加</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Story Progress Indicators */}
          <div className="flex justify-center space-x-1 mt-4">
            <div className="w-8 h-1 bg-red-500 rounded-full"></div>
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          variants={cardVariants}
          className="grid grid-cols-4 gap-3"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-white rounded-lg p-4 shadow-md border border-gray-100"
            >
              <div className="text-center">
                <div className={`w-8 h-8 rounded-lg ${stat.color} flex items-center justify-center text-white text-sm mx-auto mb-2`}>
                  {stat.icon}
                </div>
                <h3 className="text-xs font-medium text-gray-500 mb-1">{stat.title}</h3>
                <p className="text-lg font-bold text-gray-900">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Available Quizzes */}
        <motion.div 
          variants={cardVariants}
          className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">📚 利用可能なクイズ</h2>
            <span className="text-sm text-gray-500">スキルアップに挑戦しましょう</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {availableQuizzes.map((quiz, index) => (
              <motion.div
                key={quiz.title}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group cursor-pointer"
              >
                <Link href="/quiz">
                  <div className={`bg-gradient-to-r ${quiz.color} text-white rounded-xl p-6 shadow-lg transition-all duration-300 group-hover:shadow-xl`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-3xl">{quiz.icon}</div>
                      <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
                        {quiz.difficulty}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{quiz.title}</h3>
                    <p className="text-blue-100 text-sm mb-4">{quiz.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm opacity-90">{quiz.questions}問</span>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="bg-white bg-opacity-20 px-4 py-2 rounded-lg text-sm font-medium"
                      >
                        開始する →
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activities & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <motion.div 
            variants={cardVariants}
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">📈 最近のアクティビティ</h2>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                  <span className="text-lg font-bold text-green-600">{activity.score}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div 
            variants={cardVariants}
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">⚡ クイックアクション</h2>
            <div className="space-y-4">
              <Link href="/quiz">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 border border-blue-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 text-lg">🚀</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">クイズに挑戦</h3>
                      <p className="text-sm text-gray-500">新しいクイズでスキルをテスト</p>
                    </div>
                  </div>
                </motion.div>
              </Link>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 border border-green-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 text-lg">📊</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">進捗を確認</h3>
                    <p className="text-sm text-gray-500">学習の進捗と統計を見る</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 border border-purple-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 text-lg">🎯</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">目標設定</h3>
                    <p className="text-sm text-gray-500">学習目標を設定・管理</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 border border-orange-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span className="text-orange-600 text-lg">🏆</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">実績を見る</h3>
                    <p className="text-sm text-gray-500">獲得したバッジと実績</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Corporate Story View */}
      <CorporateStoryView
        story={selectedStory}
        isOpen={isStoryOpen}
        onClose={handleCloseStory}
        onStartQuiz={handleStartQuiz}
      />
    </div>
  );
} 