FROM node:15-alpine
LABEL name "soulkiller dash"

ARG DASH_ENV=dev
ENV DASH_ENV=${DASH_ENV}

WORKDIR /usr/dash

RUN apk add --update \
  && apk add --no-cache ca-certificates \
  && apk add --no-cache --virtual .build-deps curl

RUN curl -L https://unpkg.com/@pnpm/self-installer | node && apk del .build-deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json ./

COPY libs/common/package.json ./libs/common/
COPY services/dash/package.json ./services/dash/

RUN pnpm i --frozen-lockfile

COPY libs/common ./libs/common
COPY services/dash ./services/dash

RUN if [ "$DASH_ENV" = "prod" ]; then pnpm run build; fi
RUN pnpm prune --prod

CMD if [ "$DASH_ENV" = "prod" ]; then pnpm run start --filter @soulkiller/dash; else pnpm run dev --filter @soulkiller/dash; fi
