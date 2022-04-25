import colors from 'colors';
import dotenv from 'dotenv';
import App from './app';
import connectDB from './config/connectDB';
import controllers from './controllers';
import validateEnv from './utils/validateEnv';

dotenv.config();
validateEnv();

const port = process.env.PORT ? +process.env.PORT : 5000;

const app = new App(controllers, port);

async function startApp() {
  await connectDB();
  app.listen();
}

startApp()
  .catch((err) => {
    const error = err as Error;
    // eslint-disable-next-line no-console
    console.log('startAppError', colors.red(error.message));
  });
