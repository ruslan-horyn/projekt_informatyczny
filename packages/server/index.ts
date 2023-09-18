import colors from 'colors';
import 'reflect-metadata';
import App from './src/app';
import { config } from './src/config/configEnv';
import connectDB from './src/config/connectDB';
import routers from './src/routers';

const { port } = config;

const app = new App(routers, port);

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
