FROM node:14.2.0-alpine3.10

WORKDIR /var/app/frontend

RUN npm install -g @angular/cli

CMD npm i --only=dev && yarn start-on-host
