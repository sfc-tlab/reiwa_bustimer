FROM node:9.8.0

WORKDIR /src

COPY ./front .

RUN rm -rf /src/node_modules
RUN rm -rf /src/package-lock.json

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["bash", "-c", "npm run start"]
