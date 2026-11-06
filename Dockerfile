FROM node:20-alpine
WORKDIR /app
COPY bot/package*.json ./
RUN npm ci --omit=dev
COPY bot/ ./
CMD ["npm", "start"]
