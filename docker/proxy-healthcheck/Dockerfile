FROM node:16-alpine
LABEL name "proxy-healthcheck builder"

WORKDIR /opt/build

RUN apk add --update \
&& apk add --no-cache ca-certificates \
&& apk add --no-cache --virtual .build-deps curl

RUN curl -L https://unpkg.com/@pnpm/self-installer | node

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json ./

COPY libs/common/package.json ./libs/common/
COPY libs/injection/package.json ./libs/injection/
COPY libs/logger/package.json ./libs/logger/
COPY services/proxy-healthcheck/package.json ./services/proxy-healthcheck/

RUN pnpm i --frozen-lockfile && apk del .build-deps

COPY libs/common ./libs/common
COPY libs/injection ./libs/injection
COPY libs/logger ./libs/logger
COPY services/proxy-healthcheck ./services/proxy-healthcheck

RUN pnpm run build && pnpm prune --prod

FROM node:16-alpine
LABEL name "proxy-healthcheck"

EXPOSE 3000

WORKDIR /usr/proxy-healthcheck

COPY --from=0 /opt/build ./

CMD ["node", "--enable-source-maps", "services/proxy-healthcheck/dist/index.js"]
