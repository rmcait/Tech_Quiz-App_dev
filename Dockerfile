# Dockerfile
# alpineは軽量なLinux
FROM node:20-alpine

WORKDIR /app

# ./は現在のディレクトリ(Dockerfileがある場所）を指す
COPY package.json package-lock.json* ./
RUN npm install

# 左側がhost側のファイル全てで、右側はコンテナ側で指定したフォルダ（/app）にコピーする
COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]