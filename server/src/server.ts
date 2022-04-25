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
  .catch((error) => {
    console.log('startAppError', colors.red(error));
  });
