This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# sanwa-front

## Memo

- node version 18.7.0
- next js version 12.3.1
- react version 18.2.0
- typescript
- react-dom
- react-icons
- primeflex
- primeicons
- primeeract
- vscode 拡張機能 ESLint, Prettier
- jotai

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## setup for development
```bash
npm install
```

## setup for production
cd ~/sanwa-front
```bash
cp .env_base .env
```
.env
```
NEXT_PUBLIC_API_URL=""
NEXT_PUBLIC_HOST=""
NEXTAUTH_URL=""
GOOGLE_ID=
GOOGLE_SECRET=
SECRET=
DB_HOST=""
DB_NAME=""
DB_USER=""
DB_PASSWORD=""
DB_PORT=5432
```

```bash
npm install pm2 --location=global
npm install
npm run build
```

## pm2 command

```sh
# 起動
npx pm2 start pm2.yaml
# 停止
npx pm2 stop pm2.yaml
# 再起動
npx pm2 restart pm2.yaml
```

## systemctl service

* startup
```sh
pm2 startup
pm2 save
```

* unstartup
```sh
pm2 unstartup systemd
```

## Q&A

- commit できない
  - `npx tsc --noEmit` これを実行して、型エラーの対応をしてください。
  - `npm run lint:fix` これを実行して、出てきたエラーを消してください。
