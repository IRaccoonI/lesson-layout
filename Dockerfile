FROM node:12.22.3 as build

WORKDIR /app

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

RUN yarn install
COPY . .
RUN yarn build


FROM nginx

# nginx
COPY ./nginx.conf /etc/nginx/nginx.conf

# dist
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/src/templates /usr/share/nginx/html/templates


EXPOSE 80
