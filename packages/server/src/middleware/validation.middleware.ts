import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import {
  NextFunction, Request, RequestHandler, Response,
} from 'express';

import { HttpException } from '../exceptions';

const getValidationExceptionMessage = (errors: ValidationError[]) => errors
  .map((error: ValidationError) => Object.values(error.constraints || {}))
  .join(', ');

export const validationMiddleware = (
  type: ClassConstructor<object>,
  skipMissingProperties = false,
): RequestHandler => async (req: Request, _res: Response, next: NextFunction) => {
  const dtoObj = plainToClass(type, req.body);
  const validationErrors = await validate(dtoObj, { skipMissingProperties });
  const messages = getValidationExceptionMessage(validationErrors);

  if (messages) {
    next(new HttpException(messages, 400));
  }

  next();
};
