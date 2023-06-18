import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Router } from 'express';
import { errorMiddleware, loggerMiddleware } from './middleware';

class App {
  app: Application = express();

  port: number;

  constructor(routers: Router[], port: number) {
    this.port = port;

    this.initializeMiddleware();
    this.initializeRouters(routers);
    this.initializeErrorHandling();
  }

  private initializeMiddleware() {
    this.app
      .use(cors())
      .use(express.json())
      .use(express.urlencoded({ extended: true }))
      .use(cookieParser())
      .use(express.static('static'))
      .use(loggerMiddleware);
  }

  private initializeRouters(routers: Router[]) {
    routers.forEach((router) => {
      this.app.use(router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  listen() {
    this.app.listen(this.port, () => {
      // eslint-disable-next-line no-console
      console.log(
        `App listening on the port ${this.port}`,
      );
    });
  }
}

export default App;
