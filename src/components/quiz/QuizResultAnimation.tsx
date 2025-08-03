"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number[];
  wrongAnswers: number[];
  timeSpent: number;
}

interface QuizResultAnimationProps {
  result: QuizResult;
  questions: QuizQuestion[];
  onRetake: () => void;
}

export function QuizResultAnimation({ result, questions, onRetake }: QuizResultAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const isPerfect = result.score === 100;
  const isExcellent = result.score >= 80;
  const isGood = result.score >= 60;
  const isPassing = result.score >= 50;

  useEffect(() => {
    // アニメーションの順序を制御
    const timer1 = setTimeout(() => setShowScore(true), 500);
    const timer2 = setTimeout(() => setShowConfetti(true), 1000);
    const timer3 = setTimeout(() => setShowDetails(true), 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const getScoreMessage = () => {
    if (isPerfect) return "完璧です！🎉";
    if (isExcellent) return "素晴らしい成績です！🌟";
    if (isGood) return "良い成績です！👍";
    if (isPassing) return "合格です！✅";
    return "もう一度頑張りましょう！💪";
  };

  const getScoreColor = () => {
    if (isPerfect) return "from-yellow-400 to-orange-500";
    if (isExcellent) return "from-green-400 to-blue-500";
    if (isGood) return "from-blue-400 to-purple-500";
    if (isPassing) return "from-green-400 to-teal-500";
    return "from-red-400 to-pink-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* メインスコア表示 */}
        <AnimatePresence>
          {showScore && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 20,
                duration: 0.8 
              }}
              className="text-center mb-12"
            >
              <div className="relative">
                {/* 背景の光るエフェクト */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className={`absolute inset-0 bg-gradient-to-r ${getScoreColor()} rounded-full blur-3xl opacity-30`}
                />
                
                {/* メインスコアカード */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`relative bg-gradient-to-r ${getScoreColor()} text-white rounded-3xl p-12 shadow-2xl`}
                >
                  <motion.div
                    initial={{ rotate: -180, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 200, 
                      damping: 20,
                      delay: 0.3 
                    }}
                    className="text-8xl font-bold mb-4"
                  >
                    {Math.round(result.score)}%
                  </motion.div>
                  
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-3xl font-bold mb-4"
                  >
                    {getScoreMessage()}
                  </motion.h1>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-xl opacity-90"
                  >
                    {result.correctAnswers.length}問正解 / {result.totalQuestions}問中
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 紙吹雪エフェクト */}
        <AnimatePresence>
          {showConfetti && (
            <div className="fixed inset-0 pointer-events-none z-10">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: Math.random() * window.innerWidth,
                    y: -20,
                    rotate: 0,
                    opacity: 1
                  }}
                  animate={{ 
                    y: window.innerHeight + 20,
                    rotate: 360,
                    opacity: 0
                  }}
                  transition={{ 
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                  className="absolute w-2 h-2"
                  style={{
                    backgroundColor: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'][Math.floor(Math.random() * 5)],
                    borderRadius: Math.random() > 0.5 ? '50%' : '0%'
                  }}
                />
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* 詳細結果 */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
            >
              {/* 統計情報 */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">📊 統計情報</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">正答率</span>
                    <span className="text-2xl font-bold text-green-600">
                      {Math.round(result.score)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">正解数</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {result.correctAnswers.length}問
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">所要時間</span>
                    <span className="text-2xl font-bold text-purple-600">
                      {Math.round(result.timeSpent / 1000)}秒
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">平均回答時間</span>
                    <span className="text-2xl font-bold text-orange-600">
                      {Math.round((result.timeSpent / 1000) / result.totalQuestions)}秒/問
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* 問題別結果 */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">📝 問題別結果</h2>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {questions.map((question, index) => {
                    const isCorrect = result.correctAnswers.includes(index);
                    return (
                      <motion.div
                        key={question.id}
                        initial={{ opacity: 0, x: isCorrect ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: 1.2 + index * 0.1 
                        }}
                        className={`p-4 rounded-lg border-2 ${
                          isCorrect 
                            ? "border-green-200 bg-green-50" 
                            : "border-red-200 bg-red-50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">
                            問題 {index + 1}
                          </span>
                          <span className={`text-lg ${
                            isCorrect ? "text-green-600" : "text-red-600"
                          }`}>
                            {isCorrect ? "✅" : "❌"}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* アクションボタン */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="text-center space-y-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onRetake}
                className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg"
              >
                🔄 もう一度挑戦する
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = "/"}
                className="block mx-auto px-8 py-3 bg-gray-600 text-white rounded-xl font-medium hover:bg-gray-700 transition-colors"
              >
                🏠 ホームに戻る
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 