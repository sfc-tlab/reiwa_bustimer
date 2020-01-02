# README
## How to exec
1. docker build -t bustimer/api .
2. docker run -v $PWD:/go/src/work --name bustimer-api -itd -p 19081:8080 bustimer/api

## How to develop
1. docker logs -f bustimer-api

Hot reloadされるのでファイル編集したら反映されます．
バグったら  
`docker restart bustimer-api`
