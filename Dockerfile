FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
COPY tsconfig.json prisma.config.ts ./
COPY prisma ./prisma

RUN npm ci

COPY src ./src

RUN npm run build

EXPOSE 8003

CMD ["node", "dist/app.js"]