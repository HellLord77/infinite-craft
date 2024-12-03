FROM node:alpine AS build

WORKDIR /client
COPY package*.json .
RUN npm install
COPY . .
RUN sed -i "/const baseUrl/c\let baseUrl: string | null = null;" src/app/services/api.service.ts && \
    PATCH="\
    try {\n\
        const request = new XMLHttpRequest();\n\
        request.open('GET', '/base-url.txt', false);\n\
        request.send();\n\
        if (request.status === 200) { baseUrl = request.responseText; }\n\
    } catch (e) { console.error(e); }\n\
    " && \
    sed -i "/let baseUrl/a$PATCH" src/app/services/api.service.ts
RUN npm run build

FROM nginx:alpine-slim

COPY --from=build /client/dist/infinite-craft-client/browser /usr/share/nginx/html
