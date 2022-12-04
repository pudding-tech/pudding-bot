FROM node:18-alpine

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

# Set environment
ENV NODE_ENV="prod"

# Run build
CMD ["npm", "run", "startbuild"]

# Commands for building image and running container (substitute latest with version if building a release):
#   docker build -t puddingbot:latest ./
#   docker run -d --name puddingbot --env-file .env puddingbot:latest

# Save and load image (for transferring to another host) (substitute latest with version if saving a release):
#   docker save -o puddingbot.tar puddingbot:latest
#   docker load -i puddingbot.tar