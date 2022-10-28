const config = {
  PORT: Number(process.env.PORT) || 3000,
  DB_URL: process.env.DB_URL as string,
};

export default config;
