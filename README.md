# reiwa bustimer
新しい時代に向けてSFC生が今まで使っていたbustimerをリニューアルします。

## Quick start
` docker run -e --name bustimer -itd -p 3000:3000 imneko/bustimer:latest`

Let's access to `http://localhost:3000`

## Getting start (self build)
`cp .env.example .env`
`docker-compose up -d`

Let's access to `http://localhost:19080`

## Start development mode
`npm install`
`npm run dev`

Let's access to `http://localhost:3000`

## How to deploy
**デプロイ時数十秒のダウンタイムが発生するので、デプロイはバスの運行停止時間に行う。**

`git push origin master`
