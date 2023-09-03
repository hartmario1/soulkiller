FROM node:16-alpine
LABEL name "job-runner builder"

WORKDIR /opt/build

RUN apk add --update \
&& apk add --no-cache ca-certificates \
&& apk add --no-cache --virtual .build-deps curl

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true 

RUN curl -L https://unpkg.com/@pnpm/self-installer | node

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json ./

COPY libs/common/package.json ./libs/common/
COPY libs/injection/package.json ./libs/injection/
COPY libs/logger/package.json ./libs/logger/
COPY services/job-runner/package.json ./services/job-runner/

RUN pnpm i --frozen-lockfile && apk del .build-deps

COPY libs/common ./libs/common
COPY libs/injection ./libs/injection
COPY libs/logger ./libs/logger
COPY services/job-runner ./services/job-runner

RUN pnpm run build && pnpm prune --prod

FROM node:16-alpine
LABEL name "job-runner"

EXPOSE 3000
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /usr/job-runner

RUN apk add --no-cache ttf-freefont chromium harfbuzz freetype nss ca-certificates

COPY --from=0 /opt/build ./

CMD ["node", "--enable-source-maps", "services/job-runner/dist/index.js"]
