import convict from 'convict';

import dotenv from 'dotenv';

dotenv.config();

const createRequiredStringFormat = (envName: string) => (str: string): void => {
  if (!str) {
    throw new Error(`${envName} is required`);
  }
};

const tempConfig = convict({
  port: {
    env: 'ENV_NODE_PORT',
    format: Number,
    default: 3000,
  },
  db: {
    url: {
      env: 'MONGODB_URL',
      format: String,
      default: 'mongodb://localhost:27017',
    },
    user: {
      env: 'MONGO_USERNAME',
      format: String,
      default: '',
    },
    pass: {
      env: 'MONGO_PASSWORD',
      format: String,
      default: '',
    },
    name: {
      env: 'MONGO_DB_NAME',
      format: String,
      default: '',
    },
  },
  jwt: {
    secret: {

      env: 'JWT_SECRET',
      default: '',
      format: createRequiredStringFormat('JWT_SECRET'),
    },
    algorithm: {
      env: 'JWT_ALGORITHM',
      default: '',
      format: createRequiredStringFormat('JWT_ALGORITHM'),
    },
  },
  nodeEnv: {
    env: 'NODE_ENV',
    format: ['production', 'development'],
    default: 'development',
  },
})
  .validate({ allowed: 'strict' });

export const config = tempConfig.getProperties();
