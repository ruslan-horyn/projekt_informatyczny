import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import {
  NextFunction, Request, RequestHandler, Response,
} from 'express';
import HttpException from '../exceptions/HttpException';

const validationMiddleware = (
  type: ClassConstructor<object>,
  skipMissingProperties = false,
): RequestHandler => (req: Request, _res: Response, next: NextFunction) => {
  const body = req.body as unknown;
  validate(plainToInstance(type, body), { skipMissingProperties })
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
    })
    .catch((err) => {
      const error = err as Error;
      throw new HttpException(400, error.message);
    });
};

export default validationMiddleware;
