FROM node:18-alpine as builder

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY ./ ./

CMD [ "npm", "run", "build" ]

FROM nginx

EXPOSE 80

COPY --from=builder /usr/src/app/build /usr/share/nginx/html