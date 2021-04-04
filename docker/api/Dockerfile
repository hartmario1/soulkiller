FROM node:15-alpine
LABEL name "api builder"

WORKDIR /opt/build

RUN apk add --update \
&& apk add --no-cache ca-certificates \
&& apk add --no-cache --virtual .build-deps curl

RUN curl -L https://unpkg.com/@pnpm/self-installer | node

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json ./

COPY libs/common/package.json ./libs/common/
COPY libs/logger/package.json ./libs/logger/
COPY libs/rest/package.json ./libs/rest/
COPY services/api/package.json ./services/api/

RUN pnpm i --frozen-lockfile && apk del .build-deps

COPY libs/common ./libs/common
COPY libs/logger ./libs/logger
COPY libs/rest ./libs/rest
COPY services/api ./services/api

RUN pnpm run build && pnpm prune --prod

FROM node:15-alpine
LABEL name "api"

WORKDIR /usr/api

COPY --from=0 /opt/build ./

CMD ["node", "--enable-source-maps", "services/api/dist/index.js"]
