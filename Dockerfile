FROM --platform=linux/amd64 public.ecr.aws/docker/library/node:lts-alpine3.19

WORKDIR /app
COPY package*.json ./

ARG NPM_TOKEN
ARG PORT

RUN echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > ~/.npmrc
RUN npm ci

COPY . .
# RUN npm run test
RUN npm run build
RUN rm -rf /app/src
RUN rm -rf /app/test

EXPOSE ${PORT}
ENTRYPOINT ["node", "/app/dist/src/main.js"]
HEALTHCHECK --interval=5m --timeout=30s --start-period=5s --retries=3 CMD curl --fail http://localhost:${PORT}/status || exit 1