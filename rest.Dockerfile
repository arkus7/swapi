FROM node:12-alpine as builder

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build:rest


FROM node:12-alpine
WORKDIR /usr/src/app

COPY package*.json ./

COPY --from=builder /usr/src/app/dist/ ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

CMD [ "node", "dist/apps/swapi/main.js" ]
