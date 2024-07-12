FROM node:18-alpine

WORKDIR /web/repo/blog-v2

COPY package.json yarn.lock ./

COPY .yarn ./.yarn

RUN yarn install --immutable

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]