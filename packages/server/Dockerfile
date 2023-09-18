FROM node:18-alpine as build-deps

WORKDIR '/app'

COPY package*.json .

RUN npm i ci

COPY . .

CMD ["npm", "run", "start"]
