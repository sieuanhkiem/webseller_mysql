FROM node:14-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

COPY /public ./public

COPY /views ./views

COPY --from=builder /app/dist ./dist

RUN npm install

CMD ["node","dist/index.js"]
