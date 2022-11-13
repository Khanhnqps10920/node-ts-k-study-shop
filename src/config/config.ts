const config = {
  PORT: Number(process.env.PORT) || 3000,
  DB_URL: process.env.DB_URL as string,
  DEFAULT_LIMIT: 10,
  DEFAULT_PAGE: 1,
  SALT: process.env.SALT || 10,
  ACCESS_TOKEN_LIFE: process.env.ACCESS_TOKEN_LIFE || '10m',
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'secret-key',
  REFRESH_TOKEN_SIZE: 256,
};

export default config;
