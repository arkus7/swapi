FROM node:12-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run graphql:generate
RUN npm run build:graphql

CMD [ "node", "dist/apps/swapi-graphql/main.js" ]
