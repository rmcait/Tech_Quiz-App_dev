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
  const [historyFilter, setHistoryFilter] = useState<'all' | string>('all');

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

  // クイズ履歴のダミーデータ
  const quizHistory = [
    {
      id: 1,
      category: "テクノロジー",
      genre: "AI・機械学習",
      date: "2024-01-15",
      time: "14:30",
      questions: [
        {
          question: "機械学習における「過学習」とは何ですか？",
          isCorrect: true,
          userAnswer: "訓練データに対して過度に適合し、新しいデータに対する汎化性能が低下すること",
          correctAnswer: "訓練データに対して過度に適合し、新しいデータに対する汎化性能が低下すること"
        },
        {
          question: "深層学習で使用される「ReLU」活性化関数の特徴は？",
          isCorrect: false,
          userAnswer: "入力値をそのまま出力する",
          correctAnswer: "負の値を0にし、正の値はそのまま出力する"
        },
        {
          question: "教師なし学習の代表的な手法はどれですか？",
          isCorrect: true,
          userAnswer: "クラスタリング",
          correctAnswer: "クラスタリング"
        }
      ],
      score: 67,
      totalQuestions: 3
    },
    {
      id: 2,
      category: "ビジネス",
      genre: "マーケティング",
      date: "2024-01-14",
      time: "10:15",
      questions: [
        {
          question: "4Pマーケティングミックスに含まれないのはどれですか？",
          isCorrect: true,
          userAnswer: "People",
          correctAnswer: "People"
        },
        {
          question: "顧客生涯価値（LTV）を向上させる主な方法は？",
          isCorrect: false,
          userAnswer: "新規顧客の獲得",
          correctAnswer: "既存顧客の維持と単価向上"
        }
      ],
      score: 50,
      totalQuestions: 2
    },
    {
      id: 3,
      category: "ヒューマンスキル",
      genre: "コミュニケーション",
      date: "2024-01-13",
      time: "16:45",
      questions: [
        {
          question: "効果的な傾聴の基本原則として正しいのは？",
          isCorrect: true,
          userAnswer: "相手の話を最後まで聞き、理解を示す",
          correctAnswer: "相手の話を最後まで聞き、理解を示す"
        },
        {
          question: "非言語コミュニケーションが占める割合は約何％ですか？",
          isCorrect: true,
          userAnswer: "55%",
          correctAnswer: "55%"
        },
        {
          question: "フィードバックを行う際の重要なポイントは？",
          isCorrect: false,
          userAnswer: "問題点を厳しく指摘する",
          correctAnswer: "具体的で建設的な内容にする"
        }
      ],
      score: 67,
      totalQuestions: 3
    }
  ];

  const availableQuizzes = [
    { 
      title: "ビジネス", 
      description: "経営戦略、マーケティング、財務管理",
      questions: 45,
      difficulty: "中級",
      icon: "💼",
      color: "from-blue-500 to-blue-600",
      category: "ビジネス",
      genres: ["戦略・企画", "マーケティング", "財務・会計", "プロジェクト管理", "営業・販売", "人事・労務"]
    },
    { 
      title: "社会・文化", 
      description: "時事問題、歴史、文学、芸術",
      questions: 38,
      difficulty: "初級",
      icon: "🌍",
      color: "from-green-500 to-green-600",
      category: "社会・文化",
      genres: ["時事問題", "歴史", "文学・芸術", "社会制度", "国際関係"]
    },
    { 
      title: "テクノロジー", 
      description: "AI・ML、プログラミング、クラウド",
      questions: 52,
      difficulty: "上級",
      icon: "🚀",
      color: "from-purple-500 to-purple-600",
      category: "テクノロジー",
      genres: ["AI・機械学習", "プログラミング", "クラウド", "セキュリティ", "データベース", "ネットワーク", "Web開発"]
    },
    { 
      title: "ヒューマンスキル", 
      description: "コミュニケーション、リーダーシップ",
      questions: 35,
      difficulty: "中級",
      icon: "🤝",
      color: "from-orange-500 to-orange-600",
      category: "ヒューマンスキル",
      genres: ["コミュニケーション", "リーダーシップ", "チームワーク", "問題解決", "交渉術"]
    }
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

        {/* Available Quizzes */}
        <motion.div 
          variants={cardVariants}
          className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">🎯 クイズカテゴリ</h2>
            <p className="text-gray-600 text-sm mt-1">興味のあるカテゴリを選択してクイズに挑戦しよう</p>
          </div>
          
          {/* 2×2 グリッドレイアウト */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {availableQuizzes.map((quiz, index) => (
              <motion.div
                key={quiz.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="group cursor-pointer"
              >
                <Link href={`/quiz?category=${encodeURIComponent(quiz.category)}`}>
                  <div className={`bg-gradient-to-br ${quiz.color} text-white rounded-xl p-3 md:p-6 shadow-lg transition-all duration-300 group-hover:shadow-xl border border-white/20 h-full aspect-square flex items-center justify-center`}>
                    <div className="flex flex-col justify-center items-center text-center space-y-2 md:space-y-3">
                      <h3 className="text-sm md:text-xl font-bold leading-tight px-1">{quiz.title}</h3>
                      
                      {/* ジャンル表示 */}
                      <div className="flex flex-wrap gap-1 justify-center max-w-full">
                        {quiz.genres.slice(0, 2).map((genre, idx) => (
                          <span key={idx} className="text-xs bg-white/20 px-2 py-1 rounded-full whitespace-nowrap">
                            {genre}
                          </span>
                        ))}
                        {quiz.genres.length > 2 && (
                          <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                            +{quiz.genres.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          {/* カテゴリ統計 */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-blue-600">4</div>
                <div className="text-xs md:text-sm text-gray-600">カテゴリ</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-green-600">23</div>
                <div className="text-xs md:text-sm text-gray-600">ジャンル</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-purple-600">200+</div>
                <div className="text-xs md:text-sm text-gray-600">問題数</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-orange-600">3</div>
                <div className="text-xs md:text-sm text-gray-600">難易度</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quiz History */}
        <motion.div 
          variants={cardVariants}
          className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">📚 クイズ履歴</h2>
            <span className="text-sm text-gray-500">{quizHistory.length}件の履歴</span>
          </div>
          
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setHistoryFilter('all')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                historyFilter === 'all' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              すべて
            </button>
            {Array.from(new Set(quizHistory.map(h => h.category))).map(category => (
              <button
                key={category}
                onClick={() => setHistoryFilter(category)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  historyFilter === category 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="space-y-4">
            {quizHistory
              .filter(history => historyFilter === 'all' || history.category === historyFilter)
              .map((history, index) => (
                <motion.div
                  key={history.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">{history.category}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-600">{history.genre}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        history.score >= 80 ? 'bg-green-100 text-green-700' :
                        history.score >= 60 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {history.score}%
                      </div>
                      <span className="text-xs text-gray-500">{history.date} {history.time}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {history.questions.map((q, qIndex) => (
                      <div key={qIndex} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                          q.isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                        }`}>
                          {q.isCorrect ? '○' : '×'}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 mb-1">{q.question}</p>
                          {!q.isCorrect && (
                            <div className="text-xs space-y-1">
                              <div className="text-red-600">
                                <span className="font-medium">あなたの回答:</span> {q.userAnswer}
                              </div>
                              <div className="text-green-600">
                                <span className="font-medium">正解:</span> {q.correctAnswer}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
          </div>
          
          {quizHistory.filter(history => historyFilter === 'all' || history.category === historyFilter).length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {historyFilter === 'all' ? 'まだクイズを解いていません' : `${historyFilter}のクイズ履歴がありません`}
              </h3>
              <p className="text-gray-600 mb-4">クイズに挑戦して知識を深めましょう！</p>
            </div>
          )}
        </motion.div>

        {/* Corporate Story View */}
        <CorporateStoryView
          story={selectedStory}
          isOpen={isStoryOpen}
          onClose={handleCloseStory}
          onStartQuiz={handleStartQuiz}
        />
      </motion.div>
    </div>
  );
} 