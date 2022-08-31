FROM node:16-slim

ADD . /app
WORKDIR /app
RUN npm install

CMD [ "npm", "start" ]