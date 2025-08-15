"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { QuizComponent } from "@/components/quiz/QuizComponent";
import { QuizResultAnimation } from "@/components/quiz/QuizResultAnimation";

interface Genre {
  id: string;
  name: string;
  description: string;
  icon: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questionCount: number;
}

interface Category {
  title: string;
  description: string;
  icon: string;
  color: string;
  category: string;
  genres: string[];
}

interface QuizSet {
  id: string;
  title: string;
  description: string;
  questionCount: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  genre: string;
  creator: 'official' | 'user';
  creatorName?: string;
}

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

function QuizPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [viewMode, setViewMode] = useState<'genres' | 'quizzes' | 'playing' | 'result'>('genres');
  const [creatorFilter, setCreatorFilter] = useState<'official' | 'user'>('official');
  const [filteredQuizzes, setFilteredQuizzes] = useState<QuizSet[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState<QuizSet | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  // ダッシュボードと同じカテゴリデータ
  const availableQuizzes: Category[] = [
    { 
      title: "ビジネス", 
      description: "経営戦略、マーケティング、財務管理",
      icon: "💼",
      color: "from-blue-500 to-blue-600",
      category: "ビジネス",
      genres: ["戦略・企画", "マーケティング", "財務・会計", "プロジェクト管理", "営業・販売", "人事・労務"]
    },
    { 
      title: "社会・文化", 
      description: "時事問題、歴史、文学、芸術",
      icon: "🌍",
      color: "from-green-500 to-green-600",
      category: "社会・文化",
      genres: ["時事問題", "歴史", "文学・芸術", "社会制度", "国際関係"]
    },
    { 
      title: "テクノロジー", 
      description: "AI・ML、プログラミング、クラウド",
      icon: "🚀",
      color: "from-purple-500 to-purple-600",
      category: "テクノロジー",
      genres: ["AI・機械学習", "プログラミング", "クラウド", "セキュリティ", "データベース", "ネットワーク", "Web開発"]
    },
    { 
      title: "ヒューマンスキル", 
      description: "コミュニケーション、リーダーシップ",
      icon: "🤝",
      color: "from-orange-500 to-orange-600",
      category: "ヒューマンスキル",
      genres: ["コミュニケーション", "リーダーシップ", "チームワーク", "問題解決", "交渉術"]
    }
  ];

  // ジャンルの詳細データ（ダミー）
  const genreDetails: { [key: string]: Genre } = {
    "戦略・企画": { id: "strategy", name: "戦略・企画", description: "経営戦略と事業企画", icon: "🎯", difficulty: "advanced", questionCount: 15 },
    "マーケティング": { id: "marketing", name: "マーケティング", description: "マーケティング戦略と実践", icon: "📈", difficulty: "intermediate", questionCount: 20 },
    "財務・会計": { id: "finance", name: "財務・会計", description: "財務管理と会計知識", icon: "💰", difficulty: "intermediate", questionCount: 18 },
    "プロジェクト管理": { id: "project", name: "プロジェクト管理", description: "プロジェクト運営と管理", icon: "📋", difficulty: "intermediate", questionCount: 16 },
    "営業・販売": { id: "sales", name: "営業・販売", description: "営業スキルと販売戦略", icon: "🤝", difficulty: "beginner", questionCount: 14 },
    "人事・労務": { id: "hr", name: "人事・労務", description: "人事管理と労務知識", icon: "👥", difficulty: "intermediate", questionCount: 12 },
    
    "時事問題": { id: "current-events", name: "時事問題", description: "最新のニュースと社会情勢", icon: "📰", difficulty: "intermediate", questionCount: 15 },
    "歴史": { id: "history", name: "歴史", description: "世界史・日本史の基礎", icon: "🏛️", difficulty: "beginner", questionCount: 20 },
    "文学・芸術": { id: "literature", name: "文学・芸術", description: "文学作品と芸術知識", icon: "🎨", difficulty: "beginner", questionCount: 14 },
    "社会制度": { id: "social-system", name: "社会制度", description: "社会システムと制度", icon: "🏛️", difficulty: "intermediate", questionCount: 16 },
    "国際関係": { id: "international", name: "国際関係", description: "国際政治と外交", icon: "🌐", difficulty: "advanced", questionCount: 13 },
    
    "AI・機械学習": { id: "ai-ml", name: "AI・機械学習", description: "人工知能と機械学習技術", icon: "🤖", difficulty: "advanced", questionCount: 20 },
    "プログラミング": { id: "programming", name: "プログラミング", description: "プログラミング言語と開発", icon: "💻", difficulty: "intermediate", questionCount: 25 },
    "クラウド": { id: "cloud", name: "クラウド", description: "クラウドサービスとインフラ", icon: "☁️", difficulty: "advanced", questionCount: 18 },
    "セキュリティ": { id: "security", name: "セキュリティ", description: "情報セキュリティ", icon: "🔒", difficulty: "intermediate", questionCount: 22 },
    "データベース": { id: "database", name: "データベース", description: "データベース設計と管理", icon: "🗄️", difficulty: "intermediate", questionCount: 20 },
    "ネットワーク": { id: "network", name: "ネットワーク", description: "ネットワークの基礎知識", icon: "🌐", difficulty: "intermediate", questionCount: 18 },
    "Web開発": { id: "web-dev", name: "Web開発", description: "Webアプリケーション開発", icon: "🌐", difficulty: "intermediate", questionCount: 24 },
    
    "コミュニケーション": { id: "communication", name: "コミュニケーション", description: "効果的なコミュニケーション", icon: "💬", difficulty: "beginner", questionCount: 16 },
    "リーダーシップ": { id: "leadership", name: "リーダーシップ", description: "リーダーシップスキル", icon: "👑", difficulty: "advanced", questionCount: 18 },
    "チームワーク": { id: "teamwork", name: "チームワーク", description: "チーム協働スキル", icon: "🤝", difficulty: "intermediate", questionCount: 14 },
    "問題解決": { id: "problem-solving", name: "問題解決", description: "問題解決思考と手法", icon: "🧩", difficulty: "intermediate", questionCount: 17 },
    "交渉術": { id: "negotiation", name: "交渉術", description: "交渉スキルとテクニック", icon: "🤝", difficulty: "advanced", questionCount: 15 }
  };

  // クイズセットのダミーデータ
  const quizSets: QuizSet[] = [
    // AI・機械学習
    { id: "ai-basics", title: "AI基礎知識", description: "人工知能の基本概念", questionCount: 10, difficulty: "beginner", estimatedTime: 15, genre: "AI・機械学習", creator: "official" },
    { id: "ml-algorithms", title: "機械学習アルゴリズム", description: "主要な機械学習手法", questionCount: 10, difficulty: "intermediate", estimatedTime: 20, genre: "AI・機械学習", creator: "official" },
    { id: "deep-learning", title: "ディープラーニング入門", description: "ニューラルネットワークの基礎", questionCount: 10, difficulty: "advanced", estimatedTime: 25, genre: "AI・機械学習", creator: "official" },
    
    // プログラミング
    { id: "js-basics", title: "JavaScript基礎", description: "JavaScript言語の基本", questionCount: 10, difficulty: "beginner", estimatedTime: 15, genre: "プログラミング", creator: "official" },
    { id: "react-fundamentals", title: "React基礎", description: "Reactライブラリの基本", questionCount: 10, difficulty: "intermediate", estimatedTime: 20, genre: "プログラミング", creator: "official" },
    { id: "python-advanced", title: "Python応用", description: "Pythonの高度な機能", questionCount: 10, difficulty: "advanced", estimatedTime: 25, genre: "プログラミング", creator: "official" },
    
    // マーケティング
    { id: "digital-marketing", title: "デジタルマーケティング", description: "オンラインマーケティング戦略", questionCount: 10, difficulty: "intermediate", estimatedTime: 18, genre: "マーケティング", creator: "official" },
    { id: "seo-basics", title: "SEO基礎", description: "検索エンジン最適化", questionCount: 10, difficulty: "beginner", estimatedTime: 15, genre: "マーケティング", creator: "official" },
    { id: "sns-marketing", title: "SNSマーケティング", description: "ソーシャルメディア活用", questionCount: 10, difficulty: "intermediate", estimatedTime: 20, genre: "マーケティング", creator: "official" },
    
    // ユーザー作成クイズ
    { id: "user-ai-1", title: "現役データサイエンティストが教える！本当に使えるAI実装術", description: "現場で使えるAI技術", questionCount: 10, difficulty: "intermediate", estimatedTime: 20, genre: "AI・機械学習", creator: "user", creatorName: "田中AI" },
    { id: "user-ai-2", title: "ChatGPT年収1000万プロンプト術【秘密のテクニック公開】", description: "ChatGPTを使った業務効率化", questionCount: 10, difficulty: "beginner", estimatedTime: 15, genre: "AI・機械学習", creator: "user", creatorName: "佐藤プロンプト" },
    
    { id: "user-prog-1", title: "GAFAM現役エンジニアが選ぶ！JavaScript裏技集", description: "現場で必要なJS知識", questionCount: 10, difficulty: "intermediate", estimatedTime: 18, genre: "プログラミング", creator: "user", creatorName: "山田コード" },
    { id: "user-prog-2", title: "React開発で年収800万達成した実践テクニック", description: "Reactの実用的なテクニック集", questionCount: 10, difficulty: "advanced", estimatedTime: 25, genre: "プログラミング", creator: "user", creatorName: "鈴木React" },
    
    { id: "user-mark-1", title: "フォロワー10万人達成！SNS運用の極秘テクニック", description: "フォロワーを増やすコツ", questionCount: 10, difficulty: "beginner", estimatedTime: 15, genre: "マーケティング", creator: "user", creatorName: "高橋SNS" },
    { id: "user-mark-2", title: "月間PV100万達成したコンテンツマーケティングの真実", description: "効果的なコンテンツ作成法", questionCount: 10, difficulty: "intermediate", estimatedTime: 20, genre: "マーケティング", creator: "user", creatorName: "伊藤コンテンツ" },
    
    { id: "user-lead-1", title: "部下のやる気を200%引き出すリーダーシップ心理学", description: "実体験に基づくリーダー論", questionCount: 10, difficulty: "advanced", estimatedTime: 22, genre: "リーダーシップ", creator: "user", creatorName: "中村リーダー" },
    { id: "user-comm-1", title: "リモート会議で一目置かれる！プレゼン術の極意", description: "リモートワーク時代のコミュニケーション", questionCount: 10, difficulty: "beginner", estimatedTime: 12, genre: "コミュニケーション", creator: "user", creatorName: "小林会議" },
    { id: "user-cloud-1", title: "AWS障害対応で学んだ！本番運用の裏側とコツ", description: "実際の運用で学んだAWSのコツ", questionCount: 10, difficulty: "advanced", estimatedTime: 25, genre: "クラウド", creator: "user", creatorName: "松本クラウド" },
  ];

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      const foundCategory = availableQuizzes.find(quiz => quiz.category === category);
      setSelectedCategory(foundCategory || null);
    }
  }, [searchParams]);

  useEffect(() => {
    const filteredQuizzes = quizSets.filter(quiz => 
      quiz.genre === selectedGenre && quiz.creator === creatorFilter
    );
    setFilteredQuizzes(filteredQuizzes);
  }, [selectedGenre, creatorFilter]);

  const handleGenreToggle = (genreName: string) => {
    setSelectedGenre(genreName);
  };

  const handleContinue = () => {
    if (selectedGenre) {
      setViewMode('quizzes');
    }
  };

  const handleBackToDashboard = () => {
    router.push('/dashboard');
  };

  const handleBackToGenres = () => {
    setViewMode('genres');
  };

  const handleQuizStart = (quizId: string) => {
    const foundQuiz = quizSets.find(quiz => quiz.id === quizId);
    if (foundQuiz) {
      setCurrentQuiz(foundQuiz);
      setViewMode('playing');
      generateQuizQuestions(foundQuiz);
    }
  };

  const generateQuizQuestions = (quiz: QuizSet) => {
    // ジャンルに応じたダミー問題を生成
    const questions: QuizQuestion[] = [];
    
    for (let i = 0; i < quiz.questionCount; i++) {
      let question: QuizQuestion;
      
      if (quiz.genre === "AI・機械学習") {
        question = {
          id: i + 1,
          question: `AI・機械学習に関する問題${i + 1}: 機械学習の基本的なアルゴリズムはどれですか？`,
          options: [
            "線形回帰",
            "決定木",
            "ニューラルネットワーク",
            "すべて正解"
          ],
          correctAnswer: 3,
          explanation: "線形回帰、決定木、ニューラルネットワークはすべて機械学習の基本的なアルゴリズムです。"
        };
      } else if (quiz.genre === "プログラミング") {
        question = {
          id: i + 1,
          question: `プログラミングに関する問題${i + 1}: JavaScriptで配列の要素を追加するメソッドはどれですか？`,
          options: [
            "push()",
            "add()",
            "append()",
            "insert()"
          ],
          correctAnswer: 0,
          explanation: "JavaScriptでは配列の末尾に要素を追加するためにpush()メソッドを使用します。"
        };
      } else if (quiz.genre === "マーケティング") {
        question = {
          id: i + 1,
          question: `マーケティングに関する問題${i + 1}: SNSマーケティングで最も重要な指標はどれですか？`,
          options: [
            "フォロワー数",
            "エンゲージメント率",
            "投稿数",
            "いいね数"
          ],
          correctAnswer: 1,
          explanation: "エンゲージメント率は、フォロワーがどれだけ積極的にコンテンツと関わっているかを示す重要な指標です。"
        };
      } else {
        question = {
          id: i + 1,
          question: `${quiz.genre}に関する問題${i + 1}: この分野で重要な概念はどれですか？`,
          options: [
            "基礎知識",
            "実践経験",
            "継続学習",
            "すべて重要"
          ],
          correctAnswer: 3,
          explanation: "どの分野においても、基礎知識、実践経験、継続学習はすべて重要な要素です。"
        };
      }
      
      questions.push(question);
    }
    setQuizQuestions(questions);
  };

  const handleQuizComplete = (result: QuizResult) => {
    setQuizResult(result);
    setViewMode('result');
  };

  const handleAnswerSubmit = (answers: { questionId: number; selectedAnswer: number }[]) => {
    const result: QuizResult = {
      score: 0,
      totalQuestions: quizQuestions.length,
      correctAnswers: [],
      wrongAnswers: [],
      timeSpent: 0,
      answers: [],
    };
    answers.forEach((answer) => {
      const question = quizQuestions.find((q) => q.id === answer.questionId);
      if (question && question.correctAnswer === answer.selectedAnswer) {
        result.score++;
        result.correctAnswers.push(answer.questionId);
      } else {
        result.wrongAnswers.push(answer.questionId);
      }
      result.answers.push({
        questionId: answer.questionId,
        selectedAnswer: answer.selectedAnswer,
        isCorrect: !!(question && question.correctAnswer === answer.selectedAnswer),
        timeSpent: 0,
      });
    });
    handleQuizComplete(result);
  };

  const handleBackToQuizzes = () => {
    setViewMode('quizzes');
  };

  const handleRetakeQuiz = () => {
    if (currentQuiz) {
      setViewMode('playing');
      generateQuizQuestions(currentQuiz);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
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

  // カテゴリが選択されていない場合は準備中ページを表示
  if (!selectedCategory) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-6">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-6xl mb-4">🚧</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              クイズ機能
            </h1>
            <p className="text-gray-600 mb-6">
              現在準備中です
            </p>
            <button
              onClick={handleBackToDashboard}
              className="w-full py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
            >
              ダッシュボードに戻る
            </button>
          </div>
        </div>
      </div>
    );
  }

  // クイズ一覧表示
  if (viewMode === 'quizzes') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className={`bg-gradient-to-br ${selectedCategory.color} px-4 py-6`}>
          <div className="max-w-md mx-auto">
            <motion.button
              onClick={handleBackToGenres}
              className="flex items-center space-x-2 text-white/90 hover:text-white mb-4 p-2 -ml-2"
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium">ジャンル選択に戻る</span>
            </motion.button>
            
            <div className="text-center text-white">
              <div className="text-4xl mb-2">{selectedCategory.icon}</div>
              <h1 className="text-xl font-bold mb-2">クイズ一覧</h1>
              <p className="text-white/90 text-sm">
                選択したジャンル: {selectedGenre}
              </p>
            </div>
          </div>
        </div>

        {/* Creator Filter */}
        <div className="px-4 py-2">
          <div className="max-w-md mx-auto flex justify-between">
            <button
              onClick={() => setCreatorFilter('official')}
              className={`py-2 px-4 rounded-lg ${creatorFilter === 'official' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              運営作成
            </button>
            <button
              onClick={() => setCreatorFilter('user')}
              className={`py-2 px-4 rounded-lg ${creatorFilter === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              ユーザー作成
            </button>
          </div>
        </div>

        {/* Quiz List */}
        <div className="px-4 py-6">
          <div className="max-w-md mx-auto space-y-4">
            {filteredQuizzes.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
                <div className="text-4xl mb-3">📚</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  クイズが見つかりません
                </h3>
                <p className="text-gray-600 text-sm">
                  選択したジャンルのクイズは現在準備中です
                </p>
              </div>
            ) : (
              filteredQuizzes.map((quiz, index) => (
                <motion.div
                  key={quiz.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleQuizStart(quiz.id)}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 active:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-900">
                      {quiz.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3">
                    {quiz.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{quiz.questionCount}問</span>
                    <span className="text-blue-600 font-medium">開始 →</span>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  // クイズ実行画面
  if (viewMode === 'playing') {
    return (
      <QuizComponent
        questions={quizQuestions}
        onComplete={handleQuizComplete}
      />
    );
  }

  // 結果画面
  if (viewMode === 'result') {
    return (
      <QuizResultAnimation
        result={quizResult!}
        questions={quizQuestions}
        onRetake={handleRetakeQuiz}
        onBackToCategories={handleBackToQuizzes}
        categoryInfo={{
          category: selectedCategory?.category || '',
          subCategory: '',
          genre: selectedGenre
        }}
      />
    );
  }

  // TikTok風ジャンル選択画面
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className={`bg-gradient-to-br ${selectedCategory.color} px-4 py-6 pb-8`}>
        <div className="max-w-md mx-auto">
          <motion.button
            onClick={handleBackToDashboard}
            className="flex items-center space-x-2 text-white/90 hover:text-white mb-6 p-2 -ml-2"
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">戻る</span>
          </motion.button>
          
          <div className="text-center text-white">
            <div className="text-5xl mb-3">{selectedCategory.icon}</div>
            <h1 className="text-2xl font-bold mb-2">
              興味のあるジャンルを選択
            </h1>
            <p className="text-white/90 text-sm mb-4">
              1つ選択してください
            </p>
          </div>
        </div>
      </div>

      {/* Genre Tags - TikTok Style */}
      <div className="px-4 -mt-4 pb-6">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-wrap gap-3">
              {selectedCategory.genres.map((genreName, index) => {
                const isSelected = selectedGenre === genreName;
                const genre = genreDetails[genreName];
                
                return (
                  <motion.button
                    key={genreName}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleGenreToggle(genreName)}
                    className={`
                      px-4 py-3 rounded-full border-2 transition-all duration-200 flex items-center space-x-2
                      ${isSelected 
                        ? 'bg-blue-500 border-blue-500 text-white shadow-lg' 
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    <span className="text-sm">{genre?.icon}</span>
                    <span className="font-medium text-sm">{genreName}</span>
                    {isSelected && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <div className="max-w-md mx-auto">
          <motion.button
            onClick={handleContinue}
            disabled={selectedGenre === ''}
            className={`
              w-full py-4 rounded-2xl font-bold text-lg transition-all duration-200
              ${selectedGenre 
                ? 'bg-blue-500 text-white shadow-lg hover:bg-blue-600'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
            whileTap={selectedGenre ? { scale: 0.98 } : {}}
          >
            {selectedGenre 
              ? '続ける' 
              : 'ジャンルを選択してください'
            }
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    }>
      <QuizPageContent />
    </Suspense>
  );
}