"use client";

import { motion } from "framer-motion";
import Link from "next/link";

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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
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
        {/* Welcome Section */}
        <motion.div 
          variants={cardVariants}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 shadow-xl"
        >
          <div className="flex items-center space-x-6">
            {user.image && (
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg"
              >
                <img
                  src={user.image}
                  alt={user.name || 'User'}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}
            <div className="flex-1">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold mb-2"
              >
                ようこそ、{user.name}さん！
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="text-blue-100 text-lg"
              >
                今日も学習を続けて、スキルを向上させましょう
              </motion.p>
              {isAlphaOmega && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-3 inline-flex items-center px-3 py-1 bg-yellow-400 bg-opacity-20 rounded-full text-sm"
                >
                  <span className="mr-2">🌟</span>
                  <span>AlphaOmega特別権限</span>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          variants={cardVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center text-white text-xl`}>
                  {stat.icon}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
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
    </div>
  );
} 