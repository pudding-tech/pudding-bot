# PuddingBot - Discord bot
[![GitHub latest release version](https://img.shields.io/github/v/release/pudding-tech/pudding-bot.svg)](https://github.com/pudding-tech/pudding-bot/releases/latest)

PuddingBot serves the Discord server Puddings.

## Features

- Plex and Mikane integration
- User avatar and image commands
- Music playback and queue management
- Custom utility commands
- ...and more!

## Getting Started

1. **Clone the repository:**
  ```sh
  git clone https://github.com/pudding-tech/pudding-bot.git
  cd pudding-bot
  ```

2. **Install dependencies:**
  ```sh
  npm install
  ```

3. **Configure environment variables:**
    - Copy `.env.example` to `.env` and fill in the required values.

4. **Start the project:**
  ```sh
  npm run dev
  ```

## Running with Docker

You can run PuddingBot using Docker for easy deployment.

### Build the Docker image

```sh
docker build -t puddingbot:latest ./
```
Substitute `latest` with version if building a specific release.

### Run the bot container

```sh
docker run -d --name puddingbot --env-file .env puddingbot:latest
```

Or use the provided `docker-compose.yml`:

```sh
docker compose up -d
```

Make sure to configure your `.env` file with the required environment variables before starting the container.

## Usage

- Interact with the bot using Discord slash commands.
- Use `/help` in your Discord server for a list of available commands.

## License

PuddingBot is licensed under the GPL-3.0 License - see the [License](LICENSE) for more information.
