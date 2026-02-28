FROM --platform=$BUILDPLATFORM node:lts-alpine AS build

WORKDIR /infinite-craft
RUN apk add curl jq sqlite

RUN npm install --global pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . ./
RUN chmod +x data.sh && ./data.sh
RUN pnpm build

FROM joseluisq/static-web-server

COPY --from=build /infinite-craft/dist/browser ./public
