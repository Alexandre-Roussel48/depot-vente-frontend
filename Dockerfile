FROM node:lts-alpine

RUN npm install -g serve

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5002

CMD ["serve", "-s", "dist/frontend/browser", "-l", "5002"]