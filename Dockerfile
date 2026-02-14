# syntax=docker.io/docker/dockerfile:1

#
# Modified from https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile
#
# References:
# - https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine 
#   Check that link to understand why libc6-compat might be needed.
# - https://nextjs.org/telemetry
#   Next.js collects completely anonymous telemetry data about general usage, so always disable 
#   telemetry during the build and runtime, by setting ENV NEXT_TELEMETRY_DISABLED=1
# - https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
#   Automatically leverage output traces to reduce image size, where file server.js is created 
#   by next build from the standalone output.
#

# 0 - Shared Stage
FROM node:24-alpine AS base
RUN apk upgrade --latest --prune --purge --no-cache && npm install --global npm@11


# 1 - Dependencies Instalation Stage
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* .npmrc* ./
RUN if [ -f package-lock.json ]; then npm ci && npm prune; else echo "Lockfile not found." && exit 1; fi


# 2 - Source Code Compilation Stage
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . ./

ENV NEXT_TELEMETRY_DISABLED=1
RUN if [ -f package-lock.json ]; then npm run build; else echo "Lockfile not found." && exit 1; fi


# 3 - Final Production Runner Stage
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=building5/dumb-init:latest /dumb-init /usr/local/bin/

ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

EXPOSE ${PORT}

USER node
HEALTHCHECK NONE

ENTRYPOINT ["/usr/local/bin/dumb-init", "--"]
CMD ["node", "server.js"]
