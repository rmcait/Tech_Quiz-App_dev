"use client";

import { useState } from "react";
import { QuizComponent } from "../../components/quiz/QuizComponent";
import { QuizResultAnimation } from "../../components/quiz/QuizResultAnimation";

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

const sampleQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "プロジェクトマネジメントにおいて、最も重要な要素は何ですか？",
    options: [
      "予算管理",
      "スケジュール管理", 
      "リスク管理",
      "ステークホルダー管理"
    ],
    correctAnswer: 3,
    explanation: "ステークホルダー管理は、プロジェクトの成功に最も重要な要素です。"
  },
  {
    id: 2,
    question: "アジャイル開発で使用される「スプリント」の期間は通常何週間ですか？",
    options: [
      "1-2週間",
      "2-4週間",
      "4-6週間", 
      "6-8週間"
    ],
    correctAnswer: 1,
    explanation: "スプリントは通常2-4週間の期間で実施されます。"
  },
  {
    id: 3,
    question: "データベースの正規化の目的は何ですか？",
    options: [
      "データの重複を減らす",
      "クエリの速度を向上させる",
      "ストレージ容量を節約する",
      "すべての上記"
    ],
    correctAnswer: 3,
    explanation: "正規化はデータの重複削除、クエリ速度向上、ストレージ節約の全てを目的としています。"
  },
  {
    id: 4,
    question: "DevOpsの主な目標は何ですか？",
    options: [
      "開発と運用の分離",
      "開発と運用の統合",
      "コスト削減",
      "セキュリティ強化"
    ],
    correctAnswer: 1,
    explanation: "DevOpsは開発と運用の統合を主な目標としています。"
  },
  {
    id: 5,
    question: "マイクロサービスアーキテクチャの利点は何ですか？",
    options: [
      "スケーラビリティの向上",
      "開発速度の向上",
      "障害の局所化",
      "すべての上記"
    ],
    correctAnswer: 3,
    explanation: "マイクロサービスはスケーラビリティ、開発速度、障害局所化の全ての利点があります。"
  },
  {
    id: 6,
    question: "クラウドコンピューティングの3つの主要なサービスモデルは何ですか？",
    options: [
      "IaaS, PaaS, SaaS",
      "Public, Private, Hybrid",
      "Compute, Storage, Network",
      "Development, Testing, Production"
    ],
    correctAnswer: 0,
    explanation: "IaaS（Infrastructure as a Service）、PaaS（Platform as a Service）、SaaS（Software as a Service）が主要なサービスモデルです。"
  },
  {
    id: 7,
    question: "CI/CDパイプラインの「CI」は何を意味しますか？",
    options: [
      "Continuous Integration",
      "Continuous Improvement", 
      "Continuous Implementation",
      "Continuous Innovation"
    ],
    correctAnswer: 0,
    explanation: "CIはContinuous Integration（継続的インテグレーション）を意味します。"
  },
  {
    id: 8,
    question: "API設計において、RESTful APIの特徴は何ですか？",
    options: [
      "ステートレス",
      "キャッシュ可能",
      "統一されたインターフェース",
      "すべての上記"
    ],
    correctAnswer: 3,
    explanation: "RESTful APIはステートレス、キャッシュ可能、統一されたインターフェースの全ての特徴を持ちます。"
  },
  {
    id: 9,
    question: "セキュリティにおいて、「ゼロトラスト」の原則は何ですか？",
    options: [
      "信頼できるネットワーク内では安全",
      "何も信頼せず、すべてを検証する",
      "外部からのアクセスのみを制限する",
      "内部ユーザーは信頼できる"
    ],
    correctAnswer: 1,
    explanation: "ゼロトラストは「何も信頼せず、すべてを検証する」という原則です。"
  },
  {
    id: 10,
    question: "データ分析において、機械学習の3つの主要なタイプは何ですか？",
    options: [
      "教師あり学習、教師なし学習、強化学習",
      "分類、回帰、クラスタリング",
      "予測、診断、処方的分析",
      "統計、確率、最適化"
    ],
    correctAnswer: 0,
    explanation: "機械学習の3つの主要なタイプは教師あり学習、教師なし学習、強化学習です。"
  }
];

export default function QuizPage() {
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const handleQuizComplete = (result: QuizResult) => {
    setQuizResult(result);
    setIsQuizCompleted(true);
  };

  const handleRetakeQuiz = () => {
    setIsQuizCompleted(false);
    setQuizResult(null);
  };

  if (isQuizCompleted && quizResult) {
    return (
      <QuizResultAnimation 
        result={quizResult} 
        questions={sampleQuestions}
        onRetake={handleRetakeQuiz}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            ビジネス技術クイズ
          </h1>
          <p className="text-lg text-gray-600">
            10問の技術・ビジネスに関する問題に挑戦してください
          </p>
        </div>
        
        <QuizComponent 
          questions={sampleQuestions}
          onComplete={handleQuizComplete}
        />
      </div>
    </div>
  );
} 