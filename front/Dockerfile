FROM node:9.8.0

WORKDIR /src

RUN rm -rf /src/node_modules
RUN rm -rf /src/package-lock.json

CMD ["bash", "-c", "npm install && npm run build && npm run start"]
