'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';

interface CorporateStory {
  id: string;
  company: string;
  logo: string;
  banner: string;
  title: string;
  description: string;
  quizType: string;
  timePosted: string;
  isLive?: boolean;
  isNew?: boolean;
}

interface CorporateStoryViewProps {
  story: CorporateStory | null;
  isOpen: boolean;
  onClose: () => void;
  onStartQuiz: (storyId: string) => void;
}

export function CorporateStoryView({ story, isOpen, onClose, onStartQuiz }: CorporateStoryViewProps) {
  const [progress, setProgress] = useState(0);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen && story) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            // setTimeoutを使用してレンダリングサイクル外でonCloseを呼び出す
            setTimeout(() => {
              handleClose();
            }, 0);
            return 100;
          }
          return prev + 1;
        });
      }, 50); // 5秒で完了

      return () => clearInterval(interval);
    }
  }, [isOpen, story, handleClose]);

  if (!story) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black"
        >
          {/* Status Bar */}
          <div className="absolute top-0 left-0 right-0 z-10 p-4">
            <div className="flex items-center justify-between text-white">
              <span className="text-sm font-medium">9:41</span>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
                <div className="w-4 h-4 bg-white rounded-sm"></div>
                <div className="w-8 h-2 bg-white rounded-sm"></div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="absolute top-12 left-4 right-4 z-10">
            <div className="w-full h-1 bg-white bg-opacity-30 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-white rounded-full"
              />
            </div>
          </div>

          {/* Header */}
          <div className="absolute top-16 left-4 right-12 z-10">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-purple-500 p-0.5">
                <div className="w-full h-full rounded-full bg-white p-0.5">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{story.logo}</span>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="text-white font-medium text-sm">{story.company}</div>
                <div className="text-white text-xs opacity-80">{story.timePosted}</div>
              </div>
              {story.isLive && (
                <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                  LIVE
                </div>
              )}
              {story.isNew && (
                <div className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
                  NEW
                </div>
              )}
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-16 right-4 z-10 text-white text-xl font-bold"
          >
            ✕
          </button>

          {/* Main Content */}
          <div className="flex items-center justify-center h-full">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 mx-4 max-w-sm w-full shadow-2xl"
            >
              {/* Company Banner */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-400 to-purple-500 p-1">
                  <div className="w-full h-full rounded-full bg-white p-1">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
                      <span className="text-white text-lg font-bold">{story.logo}</span>
                    </div>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{story.title}</h2>
                <p className="text-gray-600 text-sm mb-4">{story.description}</p>
                <div className="inline-block bg-gradient-to-r from-orange-400 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {story.quizType}
                </div>
              </div>

              {/* Quiz Banner */}
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-4 mb-6 text-white">
                <div className="text-center">
                  <div className="text-2xl mb-2">🎯</div>
                  <h3 className="font-bold text-lg mb-2">企業特別クイズ</h3>
                  <p className="text-blue-100 text-sm">
                    {story.company}が作成した特別なクイズにチャレンジ！
                  </p>
                </div>
              </div>

              {/* Challenge Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onStartQuiz(story.id)}
                className="w-full bg-gradient-to-r from-orange-400 to-red-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                クイズにチャレンジ
              </motion.button>

              {/* Additional Info */}
              <div className="mt-4 text-center">
                <p className="text-gray-500 text-xs">
                  クイズ完了で特別ボーナスポイント獲得！
                </p>
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-sm">📷</span>
              </div>
              <div className="flex-1 bg-white bg-opacity-20 rounded-full px-4 py-2">
                <input
                  type="text"
                  placeholder="メッセージを送信..."
                  className="bg-transparent text-white placeholder-white placeholder-opacity-70 w-full text-sm outline-none"
                />
              </div>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-sm">✈️</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 