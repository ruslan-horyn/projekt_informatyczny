import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import {
  NextFunction, Request, RequestHandler, Response,
} from 'express';

import { HttpException } from '../exceptions';

const throwValidationException = (errors: ValidationError[]) => {
  const messages = errors
    .map((error: ValidationError) => Object.values(error.constraints || {}))
    .join(', ');
  throw new Error(messages);
};

export const validationMiddleware = (
  type: ClassConstructor<object>,
  skipMissingProperties = false,
): RequestHandler => (req: Request, _res: Response, next: NextFunction) => {
  const dtoObj = plainToClass(type, req.body);
  validate(dtoObj, { skipMissingProperties })
    .then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        throwValidationException(errors);
      }

      next();
    })
    .catch((err) => {
      const error = err as Error;
      next(new HttpException(error.message, 400));
    });
};
