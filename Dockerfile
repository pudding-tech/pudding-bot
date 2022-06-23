FROM node:18.4.0-alpine

# Use directory
WORKDIR /usr/src/app

# Copy packages file and install dependencies
COPY package.json ./
RUN npm install typescript -g
RUN npm install

# Copy everything
COPY ./ ./

# Build to js
RUN tsc -p ./

# Run build
CMD ["node", "build/index.js"]
#CMD ["npx", "ts-node", "src/index.ts"]

# Commands for building image and running container:
#   docker build -t puddingbot ./
#   docker run -d --name puddingbot --env-file .env puddingbot

# Save and load image (for transferring to another host):
#   docker save -o puddingbot.tar puddingbot
#   docker load -i puddingbot.tar