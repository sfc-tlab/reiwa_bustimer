![logo](front/static/img/logo_bk.svg)  ![](https://github.com/sfc-tlab/reiwa_bustimer/workflows/build/badge.svg) 

新しい時代に向けてSFC生が今まで使っていたbustimerをリニューアルします。  

![screenshot](https://i.gyazo.com/9781b72ada20c1f306331d4ce570b8fe.png)

## Quick start

`docker run -e --name bustimer -itd -p 3000:3000 imneko/bustimer:latest`

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
