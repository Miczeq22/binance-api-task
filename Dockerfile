ARG IMAGE=node:20.12-alpine


FROM $IMAGE AS builder

ARG APP_PORT
ARG DATABASE_URL

ENV APP_PORT=$APP_PORT
ENV DATABASE_URL=$DATABASE_URL

WORKDIR /app

RUN chmod 777 /app

RUN apk add --update python3 make g++\
    && rm -rf /var/cache/apk/*

RUN apk add --no-cache bash curl git py-pip make && \ 
    npx node-prune && \
    npm install node-dev -g && \
    npm cache clean --force

RUN apk update
RUN apk add
RUN apk add ffmpeg

FROM builder

COPY . .

COPY prisma ./prisma/

RUN npm install --legacy-peer-deps

RUN npx prisma generate

RUN npm rebuild bcrypt

RUN npm run build

EXPOSE $APP_PORT

RUN npm run prepare-db

CMD ["node", "./dist/main.js"]

