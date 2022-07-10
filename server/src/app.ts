import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';

import { errorMiddleware, loggerMiddleware } from './middleware';
import { Controller } from './types';

// TODO: start develop a employee, employeeAddress,
//  employeeSocialPhone, social model and shames

// TODO: start develop a job, vacancy, vacancyType model and shames

// TODO: start develop a employeeJob model and shames

class App {
  public app: Application;

  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddleware();
    this.initializeControllers(controllers);
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

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/api', controller.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  public listen() {
    this.app.listen(this.port, () => {
      // eslint-disable-next-line no-console
      console.log(
        `App listening on the port ${this.port}`,
      );
    });
  }
}

export default App;
