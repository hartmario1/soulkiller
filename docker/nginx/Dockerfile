FROM nginx:latest

LABEL name "soulkiller nginx"

ARG NGINX_ENV=dev

COPY ./docker/nginx/*.conf /etc/nginx/
COPY ./docker/nginx/sites/${NGINX_ENV}/*.conf /usr/sites/
