# TechAlpha セットアップガイド

## 必要な環境変数

このアプリケーションを動作させるには、以下の環境変数を設定する必要があります。

### 1. `.env.local` ファイルを作成

プロジェクトのルートディレクトリに `.env.local` ファイルを作成し、以下の内容を追加してください：

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/techalpha"
```

### 2. Google OAuth の設定

#### Google Cloud Console での設定

1. [Google Cloud Console](https://console.cloud.google.com/) にアクセス
2. 新しいプロジェクトを作成または既存のプロジェクトを選択
3. 「APIとサービス」→「認証情報」に移動
4. 「認証情報を作成」→「OAuth 2.0 クライアントID」を選択
5. アプリケーションの種類で「ウェブアプリケーション」を選択
6. 承認済みのリダイレクトURIに以下を追加：
   - `http://localhost:3000/api/auth/callback/google`
7. クライアントIDとクライアントシークレットを取得

#### 環境変数に設定

取得したクライアントIDとクライアントシークレットを `.env.local` に設定：

```env
GOOGLE_CLIENT_ID=your-actual-google-client-id
GOOGLE_CLIENT_SECRET=your-actual-google-client-secret
```

### 3. NextAuth シークレットの生成

セキュアなシークレットキーを生成して設定：

```bash
# ターミナルで実行
openssl rand -base64 32
```

生成されたキーを `.env.local` に設定：

```env
NEXTAUTH_SECRET=generated-secret-key
```

### 4. データベースの設定

#### PostgreSQL のセットアップ

1. PostgreSQL をインストール
2. データベースを作成：

```sql
CREATE DATABASE techalpha;
```

3. 接続URLを `.env.local` に設定：

```env
DATABASE_URL="postgresql://username:password@localhost:5432/techalpha"
```

#### Prisma のセットアップ

```bash
# Prisma クライアントを生成
npx prisma generate

# データベースマイグレーションを実行
npx prisma db push
```

## 開発サーバーの起動

環境変数を設定した後、開発サーバーを起動：

```bash
npm run dev
```

## アプリケーションの機能

### 実装済み機能

- ✅ Google OAuth ログイン
- ✅ ユーザーセッション管理
- ✅ プロフィール表示・編集
- ✅ レスポンシブデザイン
- ✅ セキュリティ機能

### ページ構成

- `/` - ホームページ（ログイン状態に応じて表示変更）
- `/auth/login` - ログインページ
- `/profile` - プロフィール管理ページ

### コンポーネント

- `GoogleSignInButton` - Google公式デザイン準拠のログインボタン
- `Header` - ナビゲーションヘッダー
- `ProfilePage` - プロフィール管理ページ

## トラブルシューティング

### よくある問題

1. **Prisma エラー**
   ```bash
   npx prisma generate
   ```

2. **環境変数が読み込まれない**
   - `.env.local` ファイルが正しい場所にあるか確認
   - 開発サーバーを再起動

3. **Google OAuth エラー**
   - リダイレクトURIが正しく設定されているか確認
   - クライアントIDとシークレットが正しいか確認

## 本番環境での設定

本番環境では、以下の点に注意してください：

1. **セキュリティ**
   - 強力な `NEXTAUTH_SECRET` を使用
   - HTTPS を使用
   - 適切な `NEXTAUTH_URL` を設定

2. **データベース**
   - 本番用データベースを使用
   - 接続プールの設定

3. **Google OAuth**
   - 本番ドメインを承認済みリダイレクトURIに追加 