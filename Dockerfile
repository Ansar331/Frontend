# Установка зависимостей для фронтенда
FROM node:20.3.0 as frontend


WORKDIR /frontend

COPY . .

# COPY frontend/package*.json ./
RUN npm install

CMD ["npm", "run", "dev"]
