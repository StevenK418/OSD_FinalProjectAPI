FROM node:alpine as base

WORKDIR /OSD_FINALPROJECTAPI

COPY package.json yarn.lock ./

RUN rm -rf node_modules && yarn install --frozen-lockfile && yarn cache clean

COPY . .

CMD ["node", "./index.js"] 

