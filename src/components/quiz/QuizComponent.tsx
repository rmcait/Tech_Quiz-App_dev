"use client";

import { useState, useEffect, useRef } from "react";
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
  answers: {
    questionId: number;
    selectedAnswer: number;
    isCorrect: boolean;
    timeSpent: number;
  }[];
}

interface QuizComponentProps {
  questions: QuizQuestion[];
  onComplete: (result: QuizResult) => void;
  onTimerUpdate?: (timeLeft: number, showCountdown: boolean) => void;
}

export function QuizComponent({ questions, onComplete, onTimerUpdate }: QuizComponentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [questionStartTimes, setQuestionStartTimes] = useState<number[]>([]);
  const [questionAnswerTimes, setQuestionAnswerTimes] = useState<number[]>([]);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10); // 10秒のタイマー
  const [showCountdown, setShowCountdown] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  useEffect(() => {
    setStartTime(Date.now());
    const initialTimes = new Array(questions.length).fill(0);
    setQuestionStartTimes(initialTimes);
    setQuestionAnswerTimes(initialTimes);
    // 最初の問題の開始時間を記録
    const newStartTimes = [...initialTimes];
    newStartTimes[0] = Date.now();
    setQuestionStartTimes(newStartTimes);
  }, [questions.length]);

  // タイマーの初期化と開始
  useEffect(() => {
    if (isAnswered) return;

    setTimeLeft(10);
    setShowCountdown(false);

    // 問題開始時間を記録
    if (currentQuestionIndex > 0) {
      const newStartTimes = [...questionStartTimes];
      newStartTimes[currentQuestionIndex] = Date.now();
      setQuestionStartTimes(newStartTimes);
    }

    // 5秒後にカウントダウン表示開始
    const countdownTimer = setTimeout(() => {
      setShowCountdown(true);
    }, 5000);

    // 1秒ごとにタイマー更新
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // タイムアウト処理
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    timerRef.current = timer;
    countdownRef.current = countdownTimer;

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (countdownRef.current) clearTimeout(countdownRef.current);
    };
  }, [currentQuestionIndex, isAnswered]);

  useEffect(() => {
    if (onTimerUpdate) {
      onTimerUpdate(timeLeft, showCountdown);
    }
  }, [timeLeft, showCountdown, onTimerUpdate]);

  // タイムアウト処理
  const handleTimeout = () => {
    if (isAnswered) return;

    const answerTime = Date.now();
    const timeSpentOnQuestion = Math.round((answerTime - questionStartTimes[currentQuestionIndex]) / 1000);

    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = -1; // -1 = タイムアウト（不正解）
    setSelectedAnswers(newAnswers);

    const newAnswerTimes = [...questionAnswerTimes];
    newAnswerTimes[currentQuestionIndex] = timeSpentOnQuestion;
    setQuestionAnswerTimes(newAnswerTimes);

    setIsAnswered(true);
    setShowCountdown(false);

    // タイマーをクリア
    if (timerRef.current) clearInterval(timerRef.current);
    if (countdownRef.current) clearTimeout(countdownRef.current);

    // 1.5秒後に次の問題へ
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setIsAnswered(false);
      } else {
        // クイズ完了
        completeQuiz(newAnswers, newAnswerTimes);
      }
    }, 1500);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return;

    const answerTime = Date.now();
    const timeSpentOnQuestion = Math.round((answerTime - questionStartTimes[currentQuestionIndex]) / 1000);

    // タイマーをクリア
    if (timerRef.current) clearInterval(timerRef.current);
    if (countdownRef.current) clearTimeout(countdownRef.current);

    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);

    const newAnswerTimes = [...questionAnswerTimes];
    newAnswerTimes[currentQuestionIndex] = timeSpentOnQuestion;
    setQuestionAnswerTimes(newAnswerTimes);

    setIsAnswered(true);
    setShowCountdown(false);

    // 少し待ってから次の問題へ
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setIsAnswered(false);
      } else {
        // クイズ完了
        completeQuiz(newAnswers, newAnswerTimes);
      }
    }, 1500);
  };

  const completeQuiz = (answers: number[], answerTimes: number[]) => {
    const timeSpent = Date.now() - startTime;
    const correctAnswers = answers
      .map((answer, index) => ({ answer, index }))
      .filter(({ answer, index }) => answer === questions[index].correctAnswer)
      .map(({ index }) => index);
    
    const wrongAnswers = answers
      .map((answer, index) => ({ answer, index }))
      .filter(({ answer, index }) => answer !== questions[index].correctAnswer)
      .map(({ index }) => index);

    // 新しい答えの形式を作成
    const detailedAnswers = answers.map((selectedAnswer, index) => ({
      questionId: questions[index].id,
      selectedAnswer: selectedAnswer,
      isCorrect: selectedAnswer === questions[index].correctAnswer,
      timeSpent: answerTimes[index] || 10 // デフォルトは10秒（タイムアウト）
    }));

    const result: QuizResult = {
      score: correctAnswers.length,
      totalQuestions: questions.length,
      correctAnswers,
      wrongAnswers,
      timeSpent,
      answers: detailedAnswers
    };

    onComplete(result);
  };

  const isCorrect = (answerIndex: number) => {
    return answerIndex === currentQuestion.correctAnswer;
  };

  const isSelected = (answerIndex: number) => {
    return selectedAnswers[currentQuestionIndex] === answerIndex;
  };

  const isTimedOut = () => {
    return selectedAnswers[currentQuestionIndex] === -1;
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6">
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

      {/* Timer */}
      <div className="text-center mb-6">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full border-4 ${
          showCountdown && timeLeft <= 3 
            ? "border-red-500 bg-red-50 text-red-700" 
            : showCountdown 
            ? "border-yellow-500 bg-yellow-50 text-yellow-700"
            : "border-gray-300 bg-gray-50 text-gray-700"
        } font-bold text-xl transition-all duration-300`}>
          {timeLeft}
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
                      : isCorrect(index) && !isTimedOut()
                      ? "border-green-500 bg-green-50 text-green-800"
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
                        : isCorrect(index) && !isTimedOut()
                        ? "border-green-500 bg-green-500 text-white"
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
                {isTimedOut() 
                  ? "⏰ 時間切れです" 
                  : isCorrect(selectedAnswers[currentQuestionIndex]) 
                  ? "✅ 正解です！" 
                  : "❌ 不正解です"
                }
              </h3>
              <p className="text-blue-800">{currentQuestion.explanation}</p>
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