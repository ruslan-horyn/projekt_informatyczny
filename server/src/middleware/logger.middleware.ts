import colors, { Color } from 'colors';
import { NextFunction, Request, Response } from 'express';

const statusColor = (code: number| undefined): string => {
  const statusCode = code || 0;

  if (statusCode <= 300) {
    return 'green';
  }

  if (statusCode <= 400) {
    return 'yellow';
  }

  if (statusCode <= 500) {
    return 'red';
  }

  return 'white';
};

export const
  loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const color = statusColor(res.statusCode);
    const consoleColor = colors.bold[color] as Color;
    // eslint-disable-next-line no-console
    console.log(consoleColor(
      `${req.method} ${res.statusCode} ${req.path}`,
    ));
    next();
  };
