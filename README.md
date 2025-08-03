This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Docker環境での起動

```bash
# Docker環境を起動
docker-compose up -d

# アプリケーションの起動確認
# Next.js: http://localhost:3000
# pgAdmin: http://localhost:8080
```

### 開発サーバーの起動

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## データベース管理

### pgAdmin（PostgreSQL GUI管理ツール）

1. **アクセス**: [http://localhost:8080](http://localhost:8080)
2. **ログイン情報**:
   - Email: `admin@admin.com`
   - Password: `admin`

3. **データベース接続設定**:
   - Host: `db` (Docker内のサービス名)
   - Port: `5432`
   - Database: `quizapp`
   - Username: `postgres`
   - Password: `postgres`

### データベース接続手順

1. pgAdminにログイン後、左側の「Servers」を右クリック
2. 「Register」→「Server...」を選択
3. **General**タブ:
   - Name: `Local PostgreSQL`
4. **Connection**タブ:
   - Host name/address: `db`
   - Port: `5432`
   - Maintenance database: `quizapp`
   - Username: `postgres`
   - Password: `postgres`
5. 「Save」をクリック

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
