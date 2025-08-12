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
  const [categoryFilter, setCategoryFilter] = useState<'all' | '一般教養' | '専門'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | '普遍的' | 'トレンド'>('all');
  const [expandedHistory, setExpandedHistory] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

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
    { title: "完了したクイズ", value: "3", icon: "", color: "bg-blue-500" },
    { title: "平均スコア", value: "85%", icon: "", color: "bg-green-500" },
    { title: "学習時間", value: "2.5時間", icon: "", color: "bg-purple-500" },
    { title: "獲得ポイント", value: "1,250", icon: "", color: "bg-yellow-500" },
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
    totalDays: streakData.totalDays,
    bonusPoints: streakData.bonusPoints
  });

  // 毎日のクイズミッションデータ
  const dailyMission = {
    date: new Date().toLocaleDateString('ja-JP', { 
      month: 'long', 
      day: 'numeric',
      weekday: 'long'
    }),
    totalQuestions: 10,
    completedQuestions: 3, // 今日完了した問題数
    rewards: {
      xp: 100,
      coins: 50,
      bonus: 25 // 完全達成時のボーナス
    },
    timeRemaining: "18:22:15", // 残り時間（リセットまで）
    isCompleted: false,
    categories: [
      { name: "ビジネス", completed: 2, total: 3, color: "bg-blue-500" },
      { name: "テクノロジー", completed: 1, total: 3, color: "bg-purple-500" },
      { name: "社会・文化", completed: 0, total: 2, color: "bg-green-500" },
      { name: "ヒューマンスキル", completed: 0, total: 2, color: "bg-orange-500" }
    ]
  };

  // クイズ履歴のダミーデータ
  const quizHistory = [
    {
      id: 1,
      category: "テクノロジー",
      genre: "AI・機械学習",
      aiCategory: "専門" as const,
      aiType: "トレンド" as const,
      confidence: 0.95,
      date: "2024-01-15",
      time: "14:30",
      score: 85,
      questions: [
        {
          question: "機械学習における過学習とは何ですか？",
          userAnswer: "モデルが訓練データに過度に適応すること",
          correctAnswer: "モデルが訓練データに過度に適応すること",
          isCorrect: true
        },
        {
          question: "ディープラーニングで使用される活性化関数はどれですか？",
          userAnswer: "ReLU",
          correctAnswer: "ReLU",
          isCorrect: true
        },
        {
          question: "バックプロパゲーションの目的は何ですか？",
          userAnswer: "重みの更新",
          correctAnswer: "誤差の逆伝播による重みの最適化",
          isCorrect: false
        }
      ]
    },
    {
      id: 2,
      category: "ビジネス",
      genre: "マーケティング",
      aiCategory: "専門" as const,
      aiType: "普遍的" as const,
      confidence: 0.88,
      date: "2024-01-14",
      time: "10:15",
      score: 92,
      questions: [
        {
          question: "4Pマーケティングミックスに含まれないものはどれですか？",
          userAnswer: "People",
          correctAnswer: "People",
          isCorrect: true
        },
        {
          question: "ブランドエクイティとは何ですか？",
          userAnswer: "ブランドの資産価値",
          correctAnswer: "ブランドの資産価値",
          isCorrect: true
        }
      ]
    },
    {
      id: 3,
      category: "社会・文化",
      genre: "時事問題",
      aiCategory: "一般教養" as const,
      aiType: "トレンド" as const,
      confidence: 0.92,
      date: "2024-01-13",
      time: "16:45",
      score: 78,
      questions: [
        {
          question: "2024年の主要な国際会議はどれですか？",
          userAnswer: "G7サミット",
          correctAnswer: "G20サミット",
          isCorrect: false
        },
        {
          question: "最近の環境政策で注目されているのは？",
          userAnswer: "カーボンニュートラル",
          correctAnswer: "カーボンニュートラル",
          isCorrect: true
        }
      ]
    },
    {
      id: 4,
      category: "ヒューマンスキル",
      genre: "コミュニケーション",
      aiCategory: "一般教養" as const,
      aiType: "普遍的" as const,
      confidence: 0.91,
      date: "2024-01-12",
      time: "13:20",
      score: 88,
      questions: [
        {
          question: "効果的なプレゼンテーションの要素は？",
          userAnswer: "明確な構成と視覚的資料",
          correctAnswer: "明確な構成と視覚的資料",
          isCorrect: true
        },
        {
          question: "アクティブリスニングとは何ですか？",
          userAnswer: "積極的に相手の話を聞くこと",
          correctAnswer: "積極的に相手の話を聞くこと",
          isCorrect: true
        }
      ]
    },
    {
      id: 5,
      category: "テクノロジー",
      genre: "セキュリティ",
      aiCategory: "専門" as const,
      aiType: "トレンド" as const,
      confidence: 0.89,
      date: "2024-01-11",
      time: "11:30",
      score: 75,
      questions: [
        {
          question: "ゼロトラストセキュリティの基本概念は？",
          userAnswer: "すべてを信頼しない",
          correctAnswer: "すべてを信頼しない",
          isCorrect: true
        },
        {
          question: "多要素認証で使用されるものは？",
          userAnswer: "パスワードとSMS",
          correctAnswer: "パスワード、生体認証、トークン",
          isCorrect: false
        }
      ]
    },
    {
      id: 6,
      category: "社会・文化",
      genre: "歴史",
      aiCategory: "一般教養" as const,
      aiType: "普遍的" as const,
      confidence: 0.96,
      date: "2024-01-10",
      time: "15:10",
      score: 94,
      questions: [
        {
          question: "明治維新が起こった年は？",
          userAnswer: "1868年",
          correctAnswer: "1868年",
          isCorrect: true
        },
        {
          question: "江戸時代の身分制度の名称は？",
          userAnswer: "士農工商",
          correctAnswer: "士農工商",
          isCorrect: true
        }
      ]
    }
  ];

  // フィルタリングされた履歴データ
  const filteredHistory = quizHistory.filter(history => {
    const categoryMatch = historyFilter === 'all' || history.category === historyFilter;
    const aiCategoryMatch = categoryFilter === 'all' || history.aiCategory === categoryFilter;
    const aiTypeMatch = typeFilter === 'all' || history.aiType === typeFilter;
    return categoryMatch && aiCategoryMatch && aiTypeMatch;
  });

  // AI分類の統計データ
  const aiStats = {
    total: quizHistory.length,
    generalKnowledge: quizHistory.filter(h => h.aiCategory === '一般教養').length,
    specialized: quizHistory.filter(h => h.aiCategory === '専門').length,
    universal: quizHistory.filter(h => h.aiType === '普遍的').length,
    trend: quizHistory.filter(h => h.aiType === 'トレンド').length,
    averageConfidence: (quizHistory.reduce((sum, h) => sum + h.confidence, 0) / quizHistory.length * 100).toFixed(1)
  };

  const availableQuizzes = [
    { 
      title: "ビジネス", 
      description: "経営戦略、マーケティング、財務管理",
      questions: 45,
      difficulty: "中級",
      icon: "",
      color: "from-blue-500 to-blue-600",
      category: "ビジネス",
      genres: ["戦略・企画", "マーケティング", "財務・会計", "プロジェクト管理", "営業・販売", "人事・労務"]
    },
    { 
      title: "社会・文化", 
      description: "時事問題、歴史、文学、芸術",
      questions: 38,
      difficulty: "初級",
      icon: "",
      color: "from-green-500 to-green-600",
      category: "社会・文化",
      genres: ["時事問題", "歴史", "文学・芸術", "社会制度", "国際関係"]
    },
    { 
      title: "テクノロジー", 
      description: "AI・ML、プログラミング、クラウド",
      questions: 52,
      difficulty: "上級",
      icon: "",
      color: "from-purple-500 to-purple-600",
      category: "テクノロジー",
      genres: ["AI・機械学習", "プログラミング", "クラウド", "セキュリティ", "データベース", "ネットワーク", "Web開発"]
    },
    { 
      title: "ヒューマンスキル", 
      description: "コミュニケーション、リーダーシップ",
      questions: 35,
      difficulty: "中級",
      icon: "",
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
        {/* 毎日のクイズミッション - モバイルファーストバナー */}
        <motion.div
          variants={cardVariants}
          className="bg-gradient-to-br from-indigo-500 via-purple-500 to-violet-500 rounded-2xl shadow-xl overflow-hidden relative border border-purple-300"
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.25)"
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* 背景装飾とアニメーション */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          <motion.div 
            className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full"
            animate={{ 
              x: [8, 12, 8],
              y: [-8, -4, -8],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full"
            animate={{ 
              x: [-4, -8, -4],
              y: [4, 8, 4],
              scale: [1, 0.9, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          
          {/* キラキラエフェクト */}
          <motion.div
            className="absolute top-4 right-1/4 w-2 h-2 bg-yellow-300 rounded-full"
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              delay: 0.5
            }}
          />
          <motion.div
            className="absolute bottom-6 left-1/3 w-1.5 h-1.5 bg-pink-300 rounded-full"
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              delay: 1.2
            }}
          />
          
          <div className="relative p-4">
            {/* ヘッダー部分 */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <motion.div 
                  className="w-8 h-8 bg-white bg-opacity-25 rounded-full flex items-center justify-center shadow-lg border border-white/30"
                  animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  {/* 炎アイコン（SVG） */}
                  <motion.svg 
                    width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  >
                    <circle cx="12" cy="12" r="9" stroke="white" strokeOpacity="0.9" strokeWidth="2" />
                    <circle cx="12" cy="12" r="5" stroke="white" strokeOpacity="0.9" strokeWidth="2" />
                    <circle cx="12" cy="12" r="2" fill="white" fillOpacity="0.95" />
                  </motion.svg>
                </motion.div>
                <div>
                  <motion.h2 
                    className="text-white font-bold text-lg leading-tight drop-shadow-sm"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    今日のミッション
                  </motion.h2>
                  <motion.p 
                    className="text-white/90 text-xs font-medium"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {dailyMission.date}
                  </motion.p>
                </div>
              </div>
              
              {/* タイマー（右上） */}
              <motion.div 
                className="text-right bg-white/15 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 }}
              >
                <div className="text-white/90 text-xs font-medium">リセット</div>
                <motion.div 
                  className="text-white font-mono text-xs font-bold"
                  animate={{ 
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {dailyMission.timeRemaining}
                </motion.div>
              </motion.div>
            </div>

            {/* 進捗情報とボタンを横並びに */}
            <div className="flex items-center justify-between">
              {/* 左側：進捗情報 */}
              <motion.div 
                className="flex-1 mr-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold text-sm drop-shadow-sm">
                    {dailyMission.completedQuestions}/{dailyMission.totalQuestions}問完了
                  </span>
                  <motion.span 
                    className="text-white/90 text-xs font-bold bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm border border-white/20"
                    animate={{ 
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {Math.round((dailyMission.completedQuestions / dailyMission.totalQuestions) * 100)}%
                  </motion.span>
                </div>
                
                {/* プログレスバー */}
                <motion.div 
                  className="w-full bg-white/25 backdrop-blur-sm rounded-full h-2 mb-2 shadow-inner border border-white/20"
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                >
                  <motion.div
                    className="rounded-full h-2 relative overflow-hidden shadow-sm"
                    style={{
                      background: "linear-gradient(90deg, #fbbf24, #f59e0b, #d97706)"
                    }}
                    initial={{ width: 0 }}
                    animate={{ 
                      width: `${(dailyMission.completedQuestions / dailyMission.totalQuestions) * 100}%` 
                    }}
                    transition={{ duration: 1.5, delay: 1.1, ease: "easeOut" }}
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-yellow-200/50 to-transparent"
                      animate={{ 
                        x: ["-100%", "100%"]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                </motion.div>

                {/* 報酬表示（コンパクト） */}
                <motion.div 
                  className="flex space-x-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 }}
                >
                  <motion.div 
                    className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/20"
                    animate={{ y: [0, -1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0 }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-300">
                      <path d="M13.5 5.5C13 3 10 2 10 2s.5 2-1 3.5C7 7 5 8.5 5 12a7 7 0 0014 0c0-3-2-4.5-3-6-1-1.5-1.5-3.5-1.5-3.5zM9 14c0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.5-1-2.5-1.5-3.5-.5 1-1 2.5-2.5 2.5S9.5 12 9 13c0 0 0 .5 0 1z"/>
                    </svg>
                    <span className="text-white text-xs font-bold">+{dailyMission.rewards.xp}</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/20"
                    animate={{ y: [0, -1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" className="text-amber-300">
                      <circle cx="12" cy="12" r="9" stroke="white" strokeOpacity="0.9" strokeWidth="2" />
                      <circle cx="12" cy="12" r="6" stroke="white" strokeOpacity="0.9" strokeWidth="2" />
                    </svg>
                    <span className="text-white text-xs font-bold">+{dailyMission.rewards.coins}</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/20"
                    animate={{ y: [0, -1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" className="text-pink-300">
                      <path d="M20 7h-3.17A3 3 0 0112 4a3 3 0 00-4.83 3H4v4h16V7zM4 13v7h7v-7H4zm9 0v7h7v-7h-7z" fill="currentColor"/>
                      <path d="M11 7h2v10h-2z" fill="white" fillOpacity="0.9"/>
                    </svg>
                    <span className="text-white text-xs font-bold">+{dailyMission.rewards.bonus}</span>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* 右側：アクションボタン（コンパクト） */}
              <Link href="/quiz">
                <motion.button
                  className="bg-white text-purple-600 font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl border border-purple-200 transition-all duration-200 whitespace-nowrap"
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  animate={{ y: [0, -1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <motion.div 
                    className="flex items-center space-x-1 text-sm"
                    animate={{ x: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-purple-600">
                      <path d="M8 5v14l11-7-11-7z" />
                    </svg>
                    <span>開始</span>
                  </motion.div>
                </motion.button>
              </Link>
            </div>

            {/* 完了時の特別表示 */}
            {dailyMission.isCompleted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-400 flex items-center justify-center rounded-2xl"
              >
                <motion.div className="text-center" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
                  <motion.svg 
                    width="24" height="24" viewBox="0 0 24 24" fill="none" className="mx-auto mb-1"
                    animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <path d="M8 21l8-8-4-4-8 8v4h4z" fill="white" fillOpacity="0.95"/>
                    <circle cx="6" cy="6" r="1.2" fill="white" fillOpacity="0.8"/>
                    <circle cx="18" cy="6" r="1" fill="white" fillOpacity="0.7"/>
                    <circle cx="6" cy="18" r="1" fill="white" fillOpacity="0.7"/>
                  </motion.svg>
                  <div className="text-white font-bold text-lg drop-shadow-sm">ミッション完了！</div>
                </motion.div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Compact & Readable Streak & Bonus Section */}
        <motion.div 
          variants={cardVariants}
          className="bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 rounded-2xl p-5 shadow-lg border border-orange-300"
        >
          {/* Main Content Row */}
          <div className="flex items-center justify-between mb-4">
            {/* Left: Streak Info with Better Typography */}
            <div className="flex items-center space-x-4">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
                className="w-12 h-12 bg-white bg-opacity-25 rounded-full flex items-center justify-center shadow-lg"
              >
                {/* 炎アイコン（SVG） */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-orange-200">
                  <path d="M13.5 5.5C13 3 10 2 10 2s.5 2-1 3.5C7 7 5 8.5 5 12a7 7 0 0014 0c0-3-2-4.5-3-6-1-1.5-1.5-3.5-1.5-3.5zM9 14c0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.5-1-2.5-1.5-3.5-.5 1-1 2.5-2.5 2.5S9.5 12 9 13c0 0 0 .5 0 1z"/>
                </svg>
              </motion.div>
              <div>
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
              <span className="text-white font-mono text-sm font-bold">{streakData.daysToNextBonus}/10日</span>
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

        {/* クイズ履歴セクション */}
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
        >
          {/* ヘッダー - モバイル最適化 */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white">📚 クイズ履歴</h2>
                <p className="text-blue-100 text-sm mt-1">AIが自動分類した学習履歴</p>
              </div>
              <div className="text-right">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-white text-sm font-medium">AI分析済み</span>
                </div>
                <div className="text-blue-100 text-xs mt-1">
                  信頼度: {aiStats.averageConfidence}%
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-4">
            {/* AI分類統計 - モバイル最適化 */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-blue-600">{aiStats.generalKnowledge}</div>
                <div className="text-xs text-blue-700 font-medium">一般教養</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-purple-600">{aiStats.specialized}</div>
                <div className="text-xs text-purple-700 font-medium">専門</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-green-600">{aiStats.universal}</div>
                <div className="text-xs text-green-700 font-medium">普遍的</div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-orange-600">{aiStats.trend}</div>
                <div className="text-xs text-orange-700 font-medium">トレンド</div>
              </div>
            </div>

            {/* フィルター切り替えボタン */}
            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full bg-gray-50 hover:bg-gray-100 rounded-xl p-4 flex items-center justify-between transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center space-x-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">フィルター</p>
                </div>
                <motion.div
                  animate={{ rotate: showFilters ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </div>
            </motion.button>

            {/* フィルターパネル - アニメーション付き */}
            <motion.div
              initial={false}
              animate={{ 
                height: showFilters ? 'auto' : 0,
                opacity: showFilters ? 1 : 0
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="space-y-4 pb-4">
                {/* カテゴリフィルター - スクロール可能 */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">📂 カテゴリ</h3>
                  <div className="flex space-x-2 overflow-x-auto pb-2">
                    {['all', 'ビジネス', 'テクノロジー', '社会・文化', 'ヒューマンスキル'].map((filter) => (
                      <motion.button
                        key={filter}
                        onClick={() => setHistoryFilter(filter)}
                        whileTap={{ scale: 0.95 }}
                        className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          historyFilter === filter
                            ? 'bg-blue-500 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {filter === 'all' ? '' : filter}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* AI分類フィルター - 2列レイアウト */}
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">🧠 知識レベル</h4>
                    <div className="flex space-x-2">
                      {['all', '一般教養', '専門'].map((filter) => (
                        <motion.button
                          key={filter}
                          onClick={() => setCategoryFilter(filter as any)}
                          whileTap={{ scale: 0.95 }}
                          className={`flex-1 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                            categoryFilter === filter
                              ? filter === '一般教養' 
                                ? 'bg-blue-500 text-white' 
                                : filter === '専門' 
                                ? 'bg-purple-500 text-white' 
                                : 'bg-gray-500 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {filter === 'all' ? '' : filter}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">⏰ 時代性</h4>
                    <div className="flex space-x-2">
                      {['all', '普遍的', 'トレンド'].map((filter) => (
                        <motion.button
                          key={filter}
                          onClick={() => setTypeFilter(filter as any)}
                          whileTap={{ scale: 0.95 }}
                          className={`flex-1 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                            typeFilter === filter
                              ? filter === '普遍的' 
                                ? 'bg-green-500 text-white' 
                                : filter === 'トレンド' 
                                ? 'bg-orange-500 text-white' 
                                : 'bg-gray-500 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {filter === 'all' ? '' : filter}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* フィルターリセット */}
                {(historyFilter !== 'all' || categoryFilter !== 'all' || typeFilter !== 'all') && (
                  <motion.button
                    onClick={() => {
                      setHistoryFilter('all');
                      setCategoryFilter('all');
                      setTypeFilter('all');
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded-xl text-sm font-medium transition-colors"
                  >
                    🔄 フィルターをリセット
                  </motion.button>
                )}
              </div>
            </motion.div>

            {/* クイズ履歴リスト - モバイル最適化 */}
            <div className="space-y-3">
              {filteredHistory.map((history, index) => (
                <motion.div
                  key={history.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-2xl overflow-hidden"
                >
                  {/* カードヘッダー - タップ可能 */}
                  <motion.button
                    onClick={() => setExpandedHistory(expandedHistory === history.id ? null : history.id)}
                    className="w-full p-4 text-left"
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 mb-2 leading-relaxed">{history.category}</p>
                          <div className={`px-3 py-2 rounded-lg ${
                            history.score >= 80 ? 'bg-green-50 border border-green-200' :
                            history.score >= 60 ? 'bg-yellow-50 border border-yellow-200' :
                            'bg-red-50 border border-red-200'
                          }`}>
                            <div className={`text-xs font-medium ${
                              history.score >= 80 ? 'text-green-700' :
                              history.score >= 60 ? 'text-yellow-700' :
                              'text-red-700'
                            }`}>
                              {history.score}%
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <motion.div
                          animate={{ rotate: expandedHistory === history.id ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </motion.div>
                      </div>
                    </div>

                    {/* AI分類バッジ */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          history.aiCategory === '一般教養' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-purple-500 text-white'
                        }`}>
                          {history.aiCategory}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          history.aiType === '普遍的' 
                            ? 'bg-green-500 text-white' 
                            : 'bg-orange-500 text-white'
                        }`}>
                          {history.aiType}
                        </span>
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <span>⭐</span>
                          <span>{(history.confidence * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {history.date} {history.time}
                      </div>
                    </div>
                  </motion.button>

                  {/* 展開可能な詳細 */}
                  <motion.div
                    initial={false}
                    animate={{ 
                      height: expandedHistory === history.id ? 'auto' : 0,
                      opacity: expandedHistory === history.id ? 1 : 0
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 space-y-3">
                      <div className="h-px bg-gray-200"></div>
                      {history.questions.map((q, qIndex) => (
                        <div key={qIndex} className="bg-white rounded-xl p-3">
                          <div className="flex items-start space-x-3">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 mb-2 leading-relaxed">{q.question}</p>
                              <div className={`px-3 py-2 rounded-lg ${
                                q.isCorrect 
                                  ? 'bg-green-50 border border-green-200' 
                                  : 'bg-red-50 border border-red-200'
                              }`}>
                                <div className={`text-xs font-medium ${
                                  q.isCorrect ? 'text-green-700' : 'text-red-700'
                                }`}>
                                  {q.isCorrect ? '✅ 正解' : '❌ 不正解'}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* 復習アクションボタン */}
                      <div className="flex space-x-2 pt-2">
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl text-sm font-medium transition-colors"
                        >
                          🔄 再挑戦
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-xl text-sm font-medium transition-colors"
                        >
                          📚 類似問題
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* 空の状態 - モバイル最適化 */}
            {filteredHistory.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🤖</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  該当する履歴がありません
                </h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  フィルターを変更するか、<br />
                  新しいクイズに挑戦してみましょう！
                </p>
                <motion.button
                  onClick={() => {
                    setHistoryFilter('all');
                    setCategoryFilter('all');
                    setTypeFilter('all');
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                >
                  🔄 フィルターをリセット
                </motion.button>
              </div>
            )}
          </div>
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