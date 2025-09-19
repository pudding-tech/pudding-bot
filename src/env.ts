interface EnvVariables {
  NODE_ENV: EnvType;
  IN_PROD: boolean;
  TZ?: string;

  PUDDINGBOT_TOKEN: string;
  PUDDINGBOT_CLIENT_ID: string;
  GUILD_ID: string;

  MIKANE_API_KEY?: string;
  PUDDINGFLIX_HOST?: string;
  PUDDINGFLIX_PORT?: string;
  PUDDINGFLIX_INFO_URL?: string;
  DUCKFLIX_HOST?: string;
  DUCKFLIX_PORT?: string;
  DUCKFLIX_INFO_URL?: string;
}

const ALLOWED_ENVIRONMENTS = ["dev", "production"] as const;
type EnvType = typeof ALLOWED_ENVIRONMENTS[number];

const isEnvType = (environement: any): environement is EnvType => {
  if (ALLOWED_ENVIRONMENTS.includes(environement)) {
    return true;
  }
  if (environement) {
    console.warn(`Invalid environment: '${environement}'. Defaulting to 'dev'`);
  } 
  return false;
};

const createEnvVariables = (env: NodeJS.ProcessEnv): EnvVariables => {

  if (!env.PUDDINGBOT_TOKEN) {
    console.error("Please provide a Discord bot token as an environment variable");
    process.exit(0);
  }

  if (!env.PUDDINGBOT_CLIENT_ID) {
    console.error("Please provide a Discord bot client ID as an environment variable");
    process.exit(0);
  }

  if (!env.GUILD_ID) {
    console.error("Please provide a Discord guild ID as an environment variable");
    process.exit(0);
  }

  return {
    NODE_ENV: isEnvType(env.NODE_ENV) ? env.NODE_ENV : "dev",
    IN_PROD: env.NODE_ENV === "production",
    TZ: env.TZ,

    PUDDINGBOT_TOKEN: env.PUDDINGBOT_TOKEN,
    PUDDINGBOT_CLIENT_ID: env.PUDDINGBOT_CLIENT_ID,
    GUILD_ID: env.GUILD_ID,

    MIKANE_API_KEY: env.MIKANE_API_KEY,
    PUDDINGFLIX_HOST: env.PUDDINGFLIX_HOST,
    PUDDINGFLIX_PORT: env.PUDDINGFLIX_PORT,
    PUDDINGFLIX_INFO_URL: env.PUDDINGFLIX_INFO_URL,
    DUCKFLIX_HOST: env.DUCKFLIX_HOST,
    DUCKFLIX_PORT: env.DUCKFLIX_PORT,
    DUCKFLIX_INFO_URL: env.DUCKFLIX_INFO_URL,
  };
};

let envVariables: EnvVariables;
try {
  envVariables = createEnvVariables(process.env);
}
catch (err) {
  console.error(err);
  process.exit(1);
}

export default envVariables;
