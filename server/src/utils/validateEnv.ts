import { cleanEnv, port, str } from 'envalid';

const validateEnv = (): void => {
  cleanEnv(process.env, {
    PORT: port(),
    NODE_ENV: str(),
    MONGO_URI: str(),
    JWT_SECRET: str(),
  });
};

export default validateEnv;
