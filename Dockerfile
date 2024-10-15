# 基盤となるイメージ
FROM node:18

# 作業ディレクトリを設定
WORKDIR /app

# 依存関係をインストールする
COPY package*.json ./
RUN npm install
RUN npm install --save-dev typescript

# アプリケーションのソースコードをコピー
COPY . .

# ポートを公開
EXPOSE 3000

# アプリケーションを起動
CMD ["npm", "start"]