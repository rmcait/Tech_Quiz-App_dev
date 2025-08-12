export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  subCategory: string;
  genre: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

// クイズセット（10問単位）の定義
export interface QuizSet {
  id: string;
  title: string;
  description: string;
  category: string;
  subCategory: string;
  genre: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questions: QuizQuestion[];
  createdBy: string;
  createdAt: string;
}

// クイズ履歴の定義
export interface QuizHistory {
  id: string;
  quizSetId: string;
  quizSetTitle: string;
  category: string;
  subCategory: string;
  genre: string;
  completedAt: string;
  score: number;
  totalQuestions: number;
  answers: {
    questionId: number;
    selectedAnswer: number;
    isCorrect: boolean;
    timeSpent: number; // 秒
  }[];
}

// カテゴリ別クイズデータ
export const quizData: Record<string, QuizQuestion[]> = {
  // 一般教養 > トレンド > 時事問題
  "current-events": [
    {
      id: 1,
      question: "2024年に開催されたパリオリンピックで、日本が最も多くのメダルを獲得した競技は何ですか？",
      options: ["柔道", "水泳", "体操", "レスリング"],
      correctAnswer: 0,
      explanation: "パリオリンピックでは柔道で日本が多くのメダルを獲得しました。",
      category: "general",
      subCategory: "general-trend",
      genre: "current-events",
      difficulty: "intermediate"
    },
    {
      id: 2,
      question: "2024年に話題となった生成AI技術で、最も注目されたのは何ですか？",
      options: ["ChatGPT-4", "Claude 3", "Gemini Pro", "すべて同程度"],
      correctAnswer: 3,
      explanation: "2024年は複数の生成AIが同時に進化し、それぞれが注目を集めました。",
      category: "general",
      subCategory: "general-trend",
      genre: "current-events",
      difficulty: "intermediate"
    }
  ],

  // 一般教養 > トレンド > テクノロジートレンド
  "tech-trends": [
    {
      id: 3,
      question: "2024年に最も注目されたAI技術のトレンドは何ですか？",
      options: ["マルチモーダルAI", "量子AI", "エッジAI", "説明可能AI"],
      correctAnswer: 0,
      explanation: "マルチモーダルAI（テキスト、画像、音声を統合処理）が2024年の主要トレンドでした。",
      category: "general",
      subCategory: "general-trend",
      genre: "tech-trends",
      difficulty: "advanced"
    },
    {
      id: 4,
      question: "Web3技術で2024年に最も成長した分野は何ですか？",
      options: ["DeFi", "NFT", "DAO", "RWA（Real World Assets）"],
      correctAnswer: 3,
      explanation: "RWA（現実世界資産のトークン化）が2024年に大きく成長しました。",
      category: "general",
      subCategory: "general-trend",
      genre: "tech-trends",
      difficulty: "advanced"
    }
  ],

  // 一般教養 > 普遍的 > 歴史
  "history": [
    {
      id: 5,
      question: "第二次世界大戦が終結した年は何年ですか？",
      options: ["1944年", "1945年", "1946年", "1947年"],
      correctAnswer: 1,
      explanation: "第二次世界大戦は1945年に終結しました。",
      category: "general",
      subCategory: "general-universal",
      genre: "history",
      difficulty: "beginner"
    },
    {
      id: 6,
      question: "日本の平安時代に書かれた世界最古の長編小説は何ですか？",
      options: ["竹取物語", "源氏物語", "枕草子", "徒然草"],
      correctAnswer: 1,
      explanation: "紫式部による「源氏物語」は世界最古の長編小説とされています。",
      category: "general",
      subCategory: "general-universal",
      genre: "history",
      difficulty: "beginner"
    }
  ],

  // 専門 > トレンド > AI・機械学習
  "ai-ml": [
    {
      id: 7,
      question: "Transformer アーキテクチャの核となる仕組みは何ですか？",
      options: ["CNN", "RNN", "Attention機構", "LSTM"],
      correctAnswer: 2,
      explanation: "Transformerの核心はAttention機構で、これにより並列処理と長距離依存関係の学習が可能になります。",
      category: "specialized",
      subCategory: "specialized-trend",
      genre: "ai-ml",
      difficulty: "advanced"
    },
    {
      id: 8,
      question: "大規模言語モデル（LLM）の学習で使用される主要な技術は何ですか？",
      options: ["教師あり学習のみ", "強化学習のみ", "自己教師あり学習", "転移学習のみ"],
      correctAnswer: 2,
      explanation: "LLMは主に自己教師あり学習（次の単語予測など）で大量のテキストから学習します。",
      category: "specialized",
      subCategory: "specialized-trend",
      genre: "ai-ml",
      difficulty: "advanced"
    }
  ],

  // 専門 > トレンド > クラウドネイティブ
  "cloud-native": [
    {
      id: 9,
      question: "Kubernetesでアプリケーションをデプロイする最小単位は何ですか？",
      options: ["Container", "Pod", "Service", "Deployment"],
      correctAnswer: 1,
      explanation: "KubernetesではPodが最小のデプロイ単位で、1つ以上のコンテナを含みます。",
      category: "specialized",
      subCategory: "specialized-trend",
      genre: "cloud-native",
      difficulty: "advanced"
    },
    {
      id: 10,
      question: "マイクロサービスアーキテクチャで重要な設計原則は何ですか？",
      options: ["単一責任の原則", "疎結合", "独立したデプロイ", "すべて重要"],
      correctAnswer: 3,
      explanation: "マイクロサービスでは単一責任、疎結合、独立デプロイすべてが重要な原則です。",
      category: "specialized",
      subCategory: "specialized-trend",
      genre: "cloud-native",
      difficulty: "advanced"
    }
  ],

  // 専門 > 普遍的 > プログラミング基礎
  "programming": [
    {
      id: 11,
      question: "時間計算量がO(log n)のアルゴリズムはどれですか？",
      options: ["線形探索", "二分探索", "バブルソート", "全探索"],
      correctAnswer: 1,
      explanation: "二分探索は毎回探索範囲を半分にするため、時間計算量はO(log n)です。",
      category: "specialized",
      subCategory: "specialized-universal",
      genre: "programming",
      difficulty: "intermediate"
    },
    {
      id: 12,
      question: "スタック（Stack）データ構造の特徴は何ですか？",
      options: ["FIFO（先入先出）", "LIFO（後入先出）", "ランダムアクセス", "優先度付き"],
      correctAnswer: 1,
      explanation: "スタックはLIFO（Last In, First Out）の特徴を持つデータ構造です。",
      category: "specialized",
      subCategory: "specialized-universal",
      genre: "programming",
      difficulty: "intermediate"
    }
  ],

  // 専門 > 普遍的 > データベース
  "database": [
    {
      id: 13,
      question: "SQLでテーブル同士を結合する際に使用するキーワードは何ですか？",
      options: ["CONNECT", "JOIN", "LINK", "MERGE"],
      correctAnswer: 1,
      explanation: "SQLではJOINキーワードを使用してテーブル同士を結合します。",
      category: "specialized",
      subCategory: "specialized-universal",
      genre: "database",
      difficulty: "intermediate"
    },
    {
      id: 14,
      question: "データベースの正規化の主な目的は何ですか？",
      options: ["処理速度の向上", "データの重複排除", "容量の削減", "セキュリティの向上"],
      correctAnswer: 1,
      explanation: "正規化の主な目的はデータの重複を排除し、整合性を保つことです。",
      category: "specialized",
      subCategory: "specialized-universal",
      genre: "database",
      difficulty: "intermediate"
    }
  ],

  // 専門 > 普遍的 > セキュリティ
  "security": [
    {
      id: 15,
      question: "HTTPSで使用される暗号化プロトコルは何ですか？",
      options: ["SSL", "TLS", "SSH", "VPN"],
      correctAnswer: 1,
      explanation: "現在のHTTPSではTLS（Transport Layer Security）プロトコルが使用されています。",
      category: "specialized",
      subCategory: "specialized-universal",
      genre: "security",
      difficulty: "intermediate"
    },
    {
      id: 16,
      question: "ゼロトラストセキュリティの基本原則は何ですか？",
      options: ["内部ネットワークを信頼する", "すべてを検証する", "境界防御に依存する", "パスワードのみで認証"],
      correctAnswer: 1,
      explanation: "ゼロトラストは「何も信頼せず、すべてを検証する」という原則に基づいています。",
      category: "specialized",
      subCategory: "specialized-universal",
      genre: "security",
      difficulty: "intermediate"
    }
  ]
};

// クイズセットデータ（10問単位でタイトル付き）
export const quizSets: QuizSet[] = [
  // 一般教養 > トレンド > 時事問題
  {
    id: "current-events-2024-1",
    title: "2024年の重要な出来事",
    description: "2024年に起こった重要なニュースや出来事について学びましょう",
    category: "general",
    subCategory: "general-trend", 
    genre: "current-events",
    difficulty: "intermediate",
    createdBy: "編集部",
    createdAt: "2024-01-15",
    questions: [
      {
        id: 1,
        question: "2024年に開催されたパリオリンピックで、日本が最も多くのメダルを獲得した競技は何ですか？",
        options: ["柔道", "水泳", "体操", "レスリング"],
        correctAnswer: 0,
        explanation: "パリオリンピックでは柔道で日本が多くのメダルを獲得しました。",
        category: "general",
        subCategory: "general-trend",
        genre: "current-events",
        difficulty: "intermediate"
      },
      {
        id: 2,
        question: "2024年に話題となった生成AI技術で、最も注目されたのは何ですか？",
        options: ["ChatGPT-4", "Claude 3", "Gemini Pro", "すべて同程度"],
        correctAnswer: 3,
        explanation: "2024年は複数の生成AIが同時に進化し、それぞれが注目を集めました。",
        category: "general",
        subCategory: "general-trend",
        genre: "current-events",
        difficulty: "intermediate"
      },
      // 残り8問のダミーデータ
      {
        id: 101,
        question: "2024年のノーベル平和賞を受賞したのは誰ですか？",
        options: ["国連難民高等弁務官事務所", "国際原子力機関", "日本被団協", "国境なき医師団"],
        correctAnswer: 2,
        explanation: "2024年のノーベル平和賞は日本被団協が受賞しました。",
        category: "general",
        subCategory: "general-trend",
        genre: "current-events",
        difficulty: "intermediate"
      },
      {
        id: 102,
        question: "2024年に日本で開催された主要な国際会議は何ですか？",
        options: ["G7サミット", "G20サミット", "APEC", "COP29"],
        correctAnswer: 0,
        explanation: "2024年には広島でG7サミットが開催されました。",
        category: "general",
        subCategory: "general-trend",
        genre: "current-events",
        difficulty: "intermediate"
      },
      {
        id: 103,
        question: "2024年に最も話題になった宇宙関連のニュースは何ですか？",
        options: ["火星探査", "月面着陸", "小惑星探査", "宇宙ステーション建設"],
        correctAnswer: 1,
        explanation: "2024年は複数の国が月面着陸ミッションを成功させました。",
        category: "general",
        subCategory: "general-trend",
        genre: "current-events",
        difficulty: "intermediate"
      },
      {
        id: 104,
        question: "2024年の日本の経済で最も注目されたトピックは何ですか？",
        options: ["円安", "インフレ", "デジタル通貨", "すべて"],
        correctAnswer: 3,
        explanation: "2024年は円安、インフレ、デジタル通貨すべてが注目されました。",
        category: "general",
        subCategory: "general-trend",
        genre: "current-events",
        difficulty: "intermediate"
      },
      {
        id: 105,
        question: "2024年に新しく導入された日本の制度は何ですか？",
        options: ["マイナンバー2.0", "デジタル庁拡充", "新NISA", "働き方改革2.0"],
        correctAnswer: 2,
        explanation: "2024年から新NISAが開始されました。",
        category: "general",
        subCategory: "general-trend",
        genre: "current-events",
        difficulty: "intermediate"
      },
      {
        id: 106,
        question: "2024年の気候変動対策で最も注目されたのは何ですか？",
        options: ["再生可能エネルギー", "カーボンニュートラル", "気候適応策", "すべて"],
        correctAnswer: 3,
        explanation: "2024年は気候変動対策のあらゆる分野で進展がありました。",
        category: "general",
        subCategory: "general-trend",
        genre: "current-events",
        difficulty: "intermediate"
      },
      {
        id: 107,
        question: "2024年のスポーツ界で最も話題になったのは何ですか？",
        options: ["パリオリンピック", "ワールドカップ", "WBC", "全米オープン"],
        correctAnswer: 0,
        explanation: "2024年はパリオリンピックが最大のスポーツイベントでした。",
        category: "general",
        subCategory: "general-trend",
        genre: "current-events",
        difficulty: "intermediate"
      },
      {
        id: 108,
        question: "2024年の日本の政治で最も重要な出来事は何ですか？",
        options: ["選挙", "法改正", "国際協定", "政策変更"],
        correctAnswer: 1,
        explanation: "2024年は重要な法改正が多数行われました。",
        category: "general",
        subCategory: "general-trend",
        genre: "current-events",
        difficulty: "intermediate"
      }
    ]
  },

  // AI・機械学習のクイズセット
  {
    id: "ai-ml-fundamentals-1",
    title: "AI・機械学習の基礎",
    description: "機械学習とAIの基本概念を理解しましょう",
    category: "specialized",
    subCategory: "specialized-trend",
    genre: "ai-ml",
    difficulty: "advanced",
    createdBy: "AI研究所",
    createdAt: "2024-02-01",
    questions: [
      {
        id: 7,
        question: "Transformer アーキテクチャの核となる仕組みは何ですか？",
        options: ["CNN", "RNN", "Attention機構", "LSTM"],
        correctAnswer: 2,
        explanation: "Transformerの核心はAttention機構で、これにより並列処理と長距離依存関係の学習が可能になります。",
        category: "specialized",
        subCategory: "specialized-trend",
        genre: "ai-ml",
        difficulty: "advanced"
      },
      {
        id: 8,
        question: "大規模言語モデル（LLM）の学習で使用される主要な技術は何ですか？",
        options: ["教師あり学習", "強化学習", "自己教師あり学習", "転移学習"],
        correctAnswer: 2,
        explanation: "LLMは主に自己教師あり学習（次の単語予測など）で事前学習されます。",
        category: "specialized",
        subCategory: "specialized-trend",
        genre: "ai-ml",
        difficulty: "advanced"
      },
      // 残り8問のダミーデータ
      {
        id: 201,
        question: "ディープラーニングで使用される活性化関数で最も一般的なのは何ですか？",
        options: ["Sigmoid", "Tanh", "ReLU", "Softmax"],
        correctAnswer: 2,
        explanation: "ReLU（Rectified Linear Unit）は勾配消失問題を軽減し、最も広く使用されています。",
        category: "specialized",
        subCategory: "specialized-trend",
        genre: "ai-ml",
        difficulty: "advanced"
      },
      {
        id: 202,
        question: "過学習を防ぐための手法として適切でないのは何ですか？",
        options: ["Dropout", "Early Stopping", "Data Augmentation", "Learning Rate増加"],
        correctAnswer: 3,
        explanation: "Learning Rateを増加させると学習が不安定になり、過学習防止には効果的ではありません。",
        category: "specialized",
        subCategory: "specialized-trend",
        genre: "ai-ml",
        difficulty: "advanced"
      },
      {
        id: 203,
        question: "CNNで画像認識において最も重要な層は何ですか？",
        options: ["全結合層", "畳み込み層", "プーリング層", "正規化層"],
        correctAnswer: 1,
        explanation: "畳み込み層は特徴抽出を行う最も重要な層です。",
        category: "specialized",
        subCategory: "specialized-trend",
        genre: "ai-ml",
        difficulty: "advanced"
      },
      {
        id: 204,
        question: "自然言語処理でBERTが革新的だった理由は何ですか？",
        options: ["双方向学習", "大規模データ", "Transformer使用", "すべて"],
        correctAnswer: 3,
        explanation: "BERTは双方向学習、大規模データ、Transformerアーキテクチャすべてを組み合わせました。",
        category: "specialized",
        subCategory: "specialized-trend",
        genre: "ai-ml",
        difficulty: "advanced"
      },
      {
        id: 205,
        question: "強化学習で環境との相互作用を表すのは何ですか？",
        options: ["エージェント", "報酬", "状態", "MDP"],
        correctAnswer: 3,
        explanation: "MDP（マルコフ決定過程）が環境との相互作用全体を表現します。",
        category: "specialized",
        subCategory: "specialized-trend",
        genre: "ai-ml",
        difficulty: "advanced"
      },
      {
        id: 206,
        question: "GANの学習で重要な概念は何ですか？",
        options: ["協調学習", "敵対的学習", "転移学習", "メタ学習"],
        correctAnswer: 1,
        explanation: "GAN（敵対的生成ネットワーク）は生成器と識別器の敵対的学習が核心です。",
        category: "specialized",
        subCategory: "specialized-trend",
        genre: "ai-ml",
        difficulty: "advanced"
      },
      {
        id: 207,
        question: "機械学習の評価指標で分類問題に適さないのは何ですか？",
        options: ["Accuracy", "Precision", "Recall", "RMSE"],
        correctAnswer: 3,
        explanation: "RMSE（Root Mean Square Error）は回帰問題の評価指標です。",
        category: "specialized",
        subCategory: "specialized-trend",
        genre: "ai-ml",
        difficulty: "advanced"
      },
      {
        id: 208,
        question: "AutoMLの主な目的は何ですか？",
        options: ["計算速度向上", "機械学習の自動化", "データ収集", "可視化"],
        correctAnswer: 1,
        explanation: "AutoMLは機械学習のパイプライン全体を自動化することが目的です。",
        category: "specialized",
        subCategory: "specialized-trend",
        genre: "ai-ml",
        difficulty: "advanced"
      }
    ]
  },

  // プログラミング基礎のクイズセット
  {
    id: "programming-basics-1",
    title: "プログラミング基礎マスター",
    description: "プログラミングの基本的なアルゴリズムとデータ構造を学習",
    category: "specialized",
    subCategory: "specialized-universal",
    genre: "programming",
    difficulty: "intermediate",
    createdBy: "プログラミング学習センター",
    createdAt: "2024-01-20",
    questions: [
      {
        id: 11,
        question: "時間計算量がO(log n)のアルゴリズムはどれですか？",
        options: ["線形探索", "二分探索", "バブルソート", "全探索"],
        correctAnswer: 1,
        explanation: "二分探索は毎回探索範囲を半分にするため、時間計算量はO(log n)です。",
        category: "specialized",
        subCategory: "specialized-universal",
        genre: "programming",
        difficulty: "intermediate"
      },
      {
        id: 12,
        question: "スタック（Stack）データ構造の特徴は何ですか？",
        options: ["FIFO（先入先出）", "LIFO（後入先出）", "ランダムアクセス", "優先度付き"],
        correctAnswer: 1,
        explanation: "スタックはLIFO（Last In, First Out）の特徴を持つデータ構造です。",
        category: "specialized",
        subCategory: "specialized-universal",
        genre: "programming",
        difficulty: "intermediate"
      },
      // 残り8問のダミーデータ
      {
        id: 301,
        question: "キュー（Queue）データ構造の特徴は何ですか？",
        options: ["LIFO（後入先出）", "FIFO（先入先出）", "ランダムアクセス", "優先度付き"],
        correctAnswer: 1,
        explanation: "キューはFIFO（First In, First Out）の特徴を持つデータ構造です。",
        category: "specialized",
        subCategory: "specialized-universal",
        genre: "programming",
        difficulty: "intermediate"
      },
      {
        id: 302,
        question: "ハッシュテーブルの平均的な検索時間計算量は何ですか？",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correctAnswer: 0,
        explanation: "ハッシュテーブルは理想的な条件下でO(1)の検索時間を実現します。",
        category: "specialized",
        subCategory: "specialized-universal",
        genre: "programming",
        difficulty: "intermediate"
      },
      {
        id: 303,
        question: "再帰アルゴリズムで必須の要素は何ですか？",
        options: ["ループ", "基底条件", "配列", "ポインタ"],
        correctAnswer: 1,
        explanation: "再帰では無限ループを防ぐために基底条件（ベースケース）が必須です。",
        category: "specialized",
        subCategory: "specialized-universal",
        genre: "programming",
        difficulty: "intermediate"
      },
      {
        id: 304,
        question: "二分木の走査方法で「根→左→右」の順序は何ですか？",
        options: ["前順走査", "中順走査", "後順走査", "レベル順走査"],
        correctAnswer: 0,
        explanation: "前順走査（プリオーダー）は根→左→右の順序で走査します。",
        category: "specialized",
        subCategory: "specialized-universal",
        genre: "programming",
        difficulty: "intermediate"
      },
      {
        id: 305,
        question: "動的プログラミングの特徴は何ですか？",
        options: ["分割統治", "部分問題の重複", "メモ化", "すべて"],
        correctAnswer: 3,
        explanation: "動的プログラミングは分割統治、部分問題の重複、メモ化すべてを特徴とします。",
        category: "specialized",
        subCategory: "specialized-universal",
        genre: "programming",
        difficulty: "intermediate"
      },
      {
        id: 306,
        question: "グラフの最短経路を求めるアルゴリズムは何ですか？",
        options: ["DFS", "BFS", "ダイクストラ法", "クラスカル法"],
        correctAnswer: 2,
        explanation: "ダイクストラ法は重み付きグラフの最短経路を求めるアルゴリズムです。",
        category: "specialized",
        subCategory: "specialized-universal",
        genre: "programming",
        difficulty: "intermediate"
      },
      {
        id: 307,
        question: "ソートアルゴリズムで最も効率的な平均時間計算量は何ですか？",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"],
        correctAnswer: 1,
        explanation: "比較ベースのソートでは理論的にO(n log n)が最適です。",
        category: "specialized",
        subCategory: "specialized-universal",
        genre: "programming",
        difficulty: "intermediate"
      },
      {
        id: 308,
        question: "リンクリストの利点は何ですか？",
        options: ["ランダムアクセス", "動的サイズ", "メモリ効率", "キャッシュ効率"],
        correctAnswer: 1,
        explanation: "リンクリストは実行時にサイズを動的に変更できる利点があります。",
        category: "specialized",
        subCategory: "specialized-universal",
        genre: "programming",
        difficulty: "intermediate"
      }
    ]
  }
];

// ジャンルIDから問題を取得する関数
export function getQuestionsByGenre(genreId: string, count?: number): QuizQuestion[] {
  const questions = quizData[genreId] || [];
  if (count && count < questions.length) {
    // ランダムに指定数の問題を選択
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
  return questions;
}

// 難易度別に問題をフィルタリングする関数
export function getQuestionsByDifficulty(
  genreId: string, 
  difficulty: 'beginner' | 'intermediate' | 'advanced'
): QuizQuestion[] {
  const questions = quizData[genreId] || [];
  return questions.filter(q => q.difficulty === difficulty);
}

// すべてのジャンルから問題を取得する関数
export function getAllQuestions(): QuizQuestion[] {
  return Object.values(quizData).flat();
}

// クイズセット関連の関数
export function getQuizSetsByGenre(genre: string): QuizSet[] {
  return quizSets.filter(set => set.genre === genre);
}

export function getQuizSetById(id: string): QuizSet | undefined {
  return quizSets.find(set => set.id === id);
}

export function getQuizSetsByCategory(category: string, subCategory?: string): QuizSet[] {
  return quizSets.filter(set => {
    if (subCategory) {
      return set.category === category && set.subCategory === subCategory;
    }
    return set.category === category;
  });
}

// クイズ履歴管理（ローカルストレージ使用）
export class QuizHistoryManager {
  private static STORAGE_KEY = 'quiz_history';

  static saveQuizResult(history: QuizHistory): void {
    const histories = this.getQuizHistories();
    histories.push(history);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(histories));
  }

  static getQuizHistories(): QuizHistory[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  static getQuizHistoriesByGenre(genre: string): QuizHistory[] {
    return this.getQuizHistories().filter(history => history.genre === genre);
  }

  static getQuizHistoriesByCategory(category: string, subCategory?: string): QuizHistory[] {
    return this.getQuizHistories().filter(history => {
      if (subCategory) {
        return history.category === category && history.subCategory === subCategory;
      }
      return history.category === category;
    });
  }

  static getQuizHistoryById(id: string): QuizHistory | undefined {
    return this.getQuizHistories().find(history => history.id === id);
  }

  static deleteQuizHistory(id: string): void {
    const histories = this.getQuizHistories().filter(history => history.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(histories));
  }

  static clearAllHistories(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
