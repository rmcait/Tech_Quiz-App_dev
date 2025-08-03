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

interface QuizComponentProps {
  questions: QuizQuestion[];
  onComplete: (result: QuizResult) => void;
}

export function QuizComponent({ questions, onComplete }: QuizComponentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return;

    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
    setIsAnswered(true);

    // 少し待ってから次の問題へ
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setIsAnswered(false);
      } else {
        // クイズ完了
        const timeSpent = Date.now() - startTime;
        const correctAnswers = newAnswers
          .map((answer, index) => answer === questions[index].correctAnswer ? index : -1)
          .filter(index => index !== -1);
        const wrongAnswers = newAnswers
          .map((answer, index) => answer !== questions[index].correctAnswer ? index : -1)
          .filter(index => index !== -1);

        const result: QuizResult = {
          score: (correctAnswers.length / questions.length) * 100,
          totalQuestions: questions.length,
          correctAnswers,
          wrongAnswers,
          timeSpent
        };

        onComplete(result);
      }
    }, 1500);
  };

  const isCorrect = (answerIndex: number) => {
    return answerIndex === currentQuestion.correctAnswer;
  };

  const isSelected = (answerIndex: number) => {
    return selectedAnswers[currentQuestionIndex] === answerIndex;
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            問題 {currentQuestionIndex + 1} / {questions.length}
          </span>
          <span className="text-sm font-medium text-gray-700">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-blue-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {currentQuestion.question}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={isAnswered}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-300 ${
                  isAnswered
                    ? isSelected(index)
                      ? isCorrect(index)
                        ? "border-green-500 bg-green-50 text-green-800"
                        : "border-red-500 bg-red-50 text-red-800"
                      : "border-gray-200 bg-gray-50 text-gray-600"
                    : isSelected(index)
                    ? "border-blue-500 bg-blue-50 text-blue-800"
                    : "border-gray-200 bg-white text-gray-900 hover:border-blue-300 hover:bg-blue-50"
                }`}
                whileHover={!isAnswered ? { scale: 1.02 } : {}}
                whileTap={!isAnswered ? { scale: 0.98 } : {}}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                    isAnswered
                      ? isSelected(index)
                        ? isCorrect(index)
                          ? "border-green-500 bg-green-500 text-white"
                          : "border-red-500 bg-red-500 text-white"
                        : "border-gray-300 bg-gray-300 text-gray-600"
                      : isSelected(index)
                      ? "border-blue-500 bg-blue-500 text-white"
                      : "border-gray-300 bg-white text-gray-600"
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Explanation */}
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
            >
              <h3 className="font-semibold text-blue-900 mb-2">
                {isCorrect(selectedAnswers[currentQuestionIndex]) ? "✅ 正解です！" : "❌ 不正解です"}
              </h3>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
          disabled={currentQuestionIndex === 0}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
        >
          前の問題
        </button>
        
        <span className="text-sm text-gray-600">
          {currentQuestionIndex + 1} / {questions.length}
        </span>
      </div>
    </div>
  );
} 