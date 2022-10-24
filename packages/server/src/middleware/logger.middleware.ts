import colors, { Color } from 'colors';
import { NextFunction, Request, Response } from 'express';

const getColorByStatusCode = (statusCode: number): Color => {
  if (statusCode <= 300) {
    return colors.green;
  }

  if (statusCode <= 400) {
    return colors.yellow;
  }

  if (statusCode <= 500) {
    return colors.red;
  }

  return colors.white;
};

export const
  loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const consoleColor = getColorByStatusCode(res.statusCode);
    // eslint-disable-next-line no-console
    console.log(consoleColor.bold(
      `${req.method} ${res.statusCode} ${req.path}`,
    ));
    next();
  };
