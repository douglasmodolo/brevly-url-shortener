# Etapa base
FROM node:20.18 AS base
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install

# Etapa de build
FROM base AS build
COPY . .
RUN npm run build
RUN npm prune --omit=dev

# Etapa de deploy
FROM gcr.io/distroless/nodejs20-debian12
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./package.json

EXPOSE 3333
USER 1000
CMD ["dist/infra/http/server.js"]
