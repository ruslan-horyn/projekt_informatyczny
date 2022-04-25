import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import {
  NextFunction, Request, RequestHandler, Response,
} from 'express';
import HttpException from '../exceptions/HttpException';

const validationMiddleware = (
  type: any,
  skipMissingProperties = false,
): RequestHandler => (req: Request, _res: Response, next: NextFunction) => {
  validate(plainToInstance(type, req.body), { skipMissingProperties })
    .then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors.map((error: ValidationError) => Object
          // @ts-ignore
          .values(error.constraints))
          .join(', ');
        next(new HttpException(400, message));
      } else {
        next();
      }
    });
};

export default validationMiddleware;
