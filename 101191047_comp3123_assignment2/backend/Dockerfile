
FROM node:16


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


EXPOSE 6000


ENV MONGO_URI=mongodb://mongodb:27017/employees_db


CMD ["npm", "start"]
