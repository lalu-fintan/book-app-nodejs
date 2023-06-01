FROM node:18.16.0

WORKDIR /app

COPY  package*.json ./

RUN npm start

COPY . .

EXPOSE 5000

CMD [ "npm","start" ]