"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface QuizCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  subCategories: QuizSubCategory[];
}

export interface QuizSubCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  genres: QuizGenre[];
}

export interface QuizGenre {
  id: string;
  name: string;
  description: string;
  icon: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questionCount: number;
}

interface QuizCategorySelectorProps {
  onCategorySelect: (category: QuizCategory) => void;
  onViewHistory: () => void;
}

// カテゴリデータ
const quizCategories: QuizCategory[] = [
  {
    id: "general",
    name: "一般教養",
    description: "幅広い知識を身につけよう",
    icon: "🎓",
    color: "blue",
    gradient: "from-blue-400 to-blue-600",
    subCategories: [
      {
        id: "general-trend",
        name: "トレンド",
        description: "今話題の最新情報",
        icon: "🔥",
        genres: [
          {
            id: "current-events",
            name: "時事問題",
            description: "最新のニュースと社会情勢",
            icon: "📰",
            difficulty: "intermediate",
            questionCount: 15
          },
          {
            id: "tech-trends",
            name: "テクノロジートレンド",
            description: "最新技術の動向",
            icon: "🚀",
            difficulty: "advanced",
            questionCount: 12
          },
          {
            id: "business-trends",
            name: "ビジネストレンド",
            description: "最新のビジネス動向",
            icon: "📈",
            difficulty: "intermediate",
            questionCount: 18
          }
        ]
      },
      {
        id: "general-universal",
        name: "普遍的",
        description: "時代を超えた基礎知識",
        icon: "⭐",
        genres: [
          {
            id: "history",
            name: "歴史",
            description: "世界史・日本史の基礎",
            icon: "🏛️",
            difficulty: "beginner",
            questionCount: 20
          },
          {
            id: "science",
            name: "科学",
            description: "物理・化学・生物の基礎",
            icon: "🔬",
            difficulty: "intermediate",
            questionCount: 16
          },
          {
            id: "literature",
            name: "文学・言語",
            description: "文学作品と言語知識",
            icon: "📚",
            difficulty: "beginner",
            questionCount: 14
          }
        ]
      }
    ]
  },
  {
    id: "specialized",
    name: "専門",
    description: "プロフェッショナルスキルを磨こう",
    icon: "💼",
    color: "purple",
    gradient: "from-purple-400 to-purple-600",
    subCategories: [
      {
        id: "specialized-trend",
        name: "トレンド",
        description: "最新の専門技術",
        icon: "⚡",
        genres: [
          {
            id: "ai-ml",
            name: "AI・機械学習",
            description: "最新のAI技術とML手法",
            icon: "🤖",
            difficulty: "advanced",
            questionCount: 20
          },
          {
            id: "cloud-native",
            name: "クラウドネイティブ",
            description: "コンテナ・K8s・マイクロサービス",
            icon: "☁️",
            difficulty: "advanced",
            questionCount: 18
          },
          {
            id: "web3",
            name: "Web3・ブロックチェーン",
            description: "分散技術と暗号通貨",
            icon: "🔗",
            difficulty: "advanced",
            questionCount: 15
          }
        ]
      },
      {
        id: "specialized-universal",
        name: "普遍的",
        description: "基礎となる専門知識",
        icon: "🎯",
        genres: [
          {
            id: "programming",
            name: "プログラミング基礎",
            description: "アルゴリズムとデータ構造",
            icon: "💻",
            difficulty: "intermediate",
            questionCount: 25
          },
          {
            id: "database",
            name: "データベース",
            description: "SQL・NoSQL・設計原則",
            icon: "🗄️",
            difficulty: "intermediate",
            questionCount: 20
          },
          {
            id: "security",
            name: "セキュリティ",
            description: "情報セキュリティの基礎",
            icon: "🔒",
            difficulty: "intermediate",
            questionCount: 22
          }
        ]
      }
    ]
  }
];

export default function QuizCategorySelector({ onCategorySelect, onViewHistory }: QuizCategorySelectorProps) {
  const handleCategorySelect = (category: QuizCategory) => {
    onCategorySelect(category);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '初級';
      case 'intermediate': return '中級';
      case 'advanced': return '上級';
      default: return '不明';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 mb-4"
        >
          🎯 クイズカテゴリを選択
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-gray-600"
        >
          あなたの興味に合わせて学習しよう！
        </motion.p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-blue-500 text-white">
              1
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700">カテゴリ</span>
          </div>
        </div>
      </div>

      {/* Category Selection */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="grid md:grid-cols-2 gap-6"
      >
        {quizCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleCategorySelect(category)}
            className={`bg-gradient-to-br ${category.gradient} rounded-2xl p-8 text-white cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300`}
          >
            <div className="text-6xl mb-4">{category.icon}</div>
            <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
            <p className="text-white/90 mb-4">{category.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                {category.subCategories.flatMap(sub => sub.genres).length}個のジャンル
              </span>
              <span className="text-2xl">→</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* History Button */}
      <div className="mt-8 text-center">
        <motion.button
          onClick={onViewHistory}
          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          📊 クイズ履歴を見る
        </motion.button>
      </div>
    </div>
  );
}
