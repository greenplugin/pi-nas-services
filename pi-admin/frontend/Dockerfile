FROM node:14.2.0-stretch-slim

WORKDIR /var/app/frontend

RUN npm install -g @angular/cli

CMD NODE_ENV=development && npm i && yarn start-on-host
