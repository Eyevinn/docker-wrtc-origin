FROM node:16-slim

ADD . /app
WORKDIR /app
RUN npm install
COPY ./example-edge-list-config.json /etc/edge-list-config.json

CMD [ "npm", "start" ]