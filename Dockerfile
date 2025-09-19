### BUILDER ###
FROM node:24-alpine AS builder

# Use directory
WORKDIR /app

# Copy packages file and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy everything
COPY ./ ./

# Build to js
RUN npx tsc -p ./

### FINAL APP ###
FROM node:24-alpine

# Install ffmpeg
RUN apk add --no-cache ffmpeg

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/build ./build

# Run build
CMD ["node", "build/src/index.js"]

# Commands for building image and running container (substitute latest with version if building a release):
#   docker build -t puddingbot:latest ./
#   docker run -d --name puddingbot --env-file .env puddingbot:latest

# Save and load image (for transferring to another host) (substitute latest with version if saving a release):
#   docker save -o puddingbot.tar puddingbot:latest
#   docker load -i puddingbot.tar
