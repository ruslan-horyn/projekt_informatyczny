import { cleanEnv, port, str } from 'envalid';

export const validateEnv = (): void => {
  cleanEnv(process.env, {
    PORT: port(),
    NODE_ENV: str(),
    // MONGO_URI: str(),x
    MONGO_HOST: str(),
    MONGO_PORT: str(),
    MONGO_DB: str(),
    JWT_SECRET: str(),
  });
};
