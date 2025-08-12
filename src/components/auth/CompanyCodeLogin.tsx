"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { AnimatePresence } from "framer-motion";

// 有効な企業コードのリスト（実際の実装ではデータベースから取得）
const VALID_COMPANY_CODES = [
  "TECH001",
  "TECH002", 
  "TECH003",
  "ALPHA001",
  "ALPHA002",
  "OMEGA001",
  "OMEGA002",
  "DEMO001"
];

export function CompanyCodeLogin() {
  const [companyCode, setCompanyCode] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");
  const [showGoogleLogin, setShowGoogleLogin] = useState(false);
  const [buttonState, setButtonState] = useState<'idle' | 'loading' | 'success'>('idle');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showMovingCheckmark, setShowMovingCheckmark] = useState(false);
  const [hideButton, setHideButton] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile to tune animation distance
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 640); // Tailwind sm breakpoint
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const validateCompanyCode = async () => {
    if (!companyCode.trim()) {
      setError("企業コードを入力してください");
      return;
    }

    setButtonState('loading');
    setIsValidating(true);
    setError("");

    // 実際の実装ではAPIエンドポイントでバリデーション
    // ここでは模擬的な遅延を追加
    await new Promise(resolve => setTimeout(resolve, 1500));

    const isValidCode = VALID_COMPANY_CODES.includes(companyCode.toUpperCase());
    
    if (isValidCode) {
      setButtonState('success');
      setShowSuccessMessage(true);
      setIsValid(false); // 初期状態ではチェックマークを非表示
      setShowGoogleLogin(true);
      setError("");
      
      // 1秒後にメッセージをフェードアウト
      setTimeout(() => {
        setShowSuccessMessage(false);
        setShowMovingCheckmark(true);
      }, 1000);
      
      // 移動完了後にボタンを非表示にする
      setTimeout(() => {
        setHideButton(true);
      }, 2500); // 1000ms (メッセージフェードアウト) + 200ms (遅延) + 1000ms (移動時間) + 300ms (待機時間)
      
      // ボタンがフェードアウトした後にチェックマークを表示し、Googleログインを実行する
      setTimeout(() => {
        setIsValid(true);
        // 企業コード認証完了後、自動的にGoogleログインを実行
        handleGoogleSignIn();
      }, 3000); // 2500ms (ボタンフェードアウト) + 500ms (遅延)
    } else {
      setButtonState('idle');
      setShowSuccessMessage(false);
      setShowMovingCheckmark(false);
      setHideButton(false);
      setError("無効な企業コードです。正しいコードを入力してください。");
      setIsValid(false);
      setShowGoogleLogin(false);
    }

    setIsValidating(false);
  };

  const handleGoogleSignIn = async () => {
    if (!isValid) return;
    
    try {
      // 将来的にGoogleログインの実装を行うため、現在は直接ダッシュボードに遷移
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("ログインエラー:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      validateCompanyCode();
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        {/* Logo Section */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            TechAlpha
          </h1>
          <p className="text-gray-600">
            企業向け学習管理システム
          </p>
        </motion.div>

        {/* Login Card */}
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              企業コード認証
            </h2>
            <p className="text-gray-600">
              企業コードを入力してからGoogleでログインしてください
            </p>
          </div>

          {/* Company Code Input */}
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="companyCode" className="block text-sm font-medium text-gray-700 mb-2">
                企業コード
              </label>
              <motion.div
                whileFocus={{ scale: 1.02 }}
                className="relative"
              >
                <input
                  id="companyCode"
                  type="text"
                  value={companyCode}
                  onChange={(e) => {
                    setCompanyCode(e.target.value);
                    if (buttonState !== 'idle') {
                      setButtonState('idle');
                      setShowSuccessMessage(false);
                      setShowMovingCheckmark(false);
                      setHideButton(false);
                      setIsValid(false);
                      setShowGoogleLogin(false);
                    }
                    if (error) setError("");
                  }}
                  onKeyPress={handleKeyPress}
                  placeholder="例: TECH001"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 ${
                    isValid 
                      ? "border-green-500 bg-green-50" 
                      : error 
                      ? "border-red-500 bg-red-50" 
                      : "border-gray-300 focus:border-blue-500"
                  }`}
                  disabled={isValidating}
                />
                {isValid && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200"
              >
                {error}
              </motion.div>
            )}

            {/* Validation Button */}
            <motion.div
              animate={{ 
                opacity: hideButton ? 0 : 1,
                height: hideButton ? 0 : "auto",
                marginBottom: hideButton ? 0 : "1rem"
              }}
              transition={{ 
                duration: 0.5,
                ease: "easeInOut"
              }}
              className="relative overflow-visible"
            >
              <motion.button
                whileHover={{ scale: buttonState === 'idle' ? 1.02 : 1 }}
                whileTap={{ scale: buttonState === 'idle' ? 0.98 : 1 }}
                onClick={validateCompanyCode}
                disabled={isValidating || !companyCode.trim()}
                className={`w-full py-3 px-4 border border-transparent rounded-xl font-medium transition-all duration-300 overflow-hidden ${
                  buttonState === 'success'
                    ? "bg-green-500 text-white"
                    : isValidating || !companyCode.trim()
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                <AnimatePresence mode="wait">
                  {buttonState === 'loading' && (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center justify-center"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                      認証中...
                    </motion.div>
                  )}
                  
                  {buttonState === 'success' && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center justify-center relative"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ 
                          scale: 1,
                          x: showMovingCheckmark ? (isMobile ? 140 : 180) : 0,
                          rotate: showMovingCheckmark ? 1440 : 0
                        }}
                        transition={{ 
                          type: showMovingCheckmark ? "tween" : "spring",
                          stiffness: showMovingCheckmark ? undefined : 500,
                          damping: showMovingCheckmark ? undefined : 30,
                          delay: showMovingCheckmark ? 0 : 0.2,
                          duration: showMovingCheckmark ? 1.0 : 0.3,
                          ease: showMovingCheckmark ? "easeInOut" : undefined
                        }}
                        className={`w-6 h-6 bg-white rounded-full flex items-center justify-center mr-2 ${
                          showMovingCheckmark ? 'border-2 border-green-500' : ''
                        }`}
                      >
                        <motion.svg
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ 
                            duration: 0.5, 
                            delay: 0.4,
                            ease: "easeInOut"
                          }}
                          className="w-4 h-4 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </motion.svg>
                      </motion.div>
                      
                      <motion.span
                        animate={{ 
                          opacity: showSuccessMessage ? 1 : 0
                        }}
                        transition={{ 
                          duration: 0.3
                        }}
                        className="ml-2"
                      >
                        認証完了
                      </motion.span>
                    </motion.div>
                  )}
                  
                  {buttonState === 'idle' && (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      企業コードを認証
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </div>

          {/* Google Sign In Button */}
          <AnimatePresence>
            {showGoogleLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      認証完了後
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGoogleSignIn}
                  className="w-full flex items-center justify-center px-6 py-4 border border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="font-medium">Googleでログイン</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Info Section */}
          <motion.div 
            className="mt-8 p-4 bg-blue-50 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-start space-x-3">
              <div className="text-blue-500 text-lg">ℹ️</div>
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">企業コードについて</p>
                <p>
                  企業コードは管理者から提供されます。
                  不明な場合は管理者にお問い合わせください。
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div 
          className="text-center mt-8 text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          &copy; 2024 TechAlpha. All rights reserved.
        </motion.div>
      </motion.div>
    </div>
  );
} 