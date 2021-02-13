FROM nginx:latest

LABEL name "soulkiller nginx"

ARG NGINX_ENV=dev

COPY ./docker/services/nginx/*.conf /etc/nginx/
COPY ./docker/services/nginx/sites/${NGINX_ENV}/*.conf /usr/sites/
