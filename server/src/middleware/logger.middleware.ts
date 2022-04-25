import colors from 'colors';
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

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const color = statusColor(res.statusCode);
  console.log(colors.bold[color](
    `${req.method} ${res.statusCode} ${req.path}`,
  ));
  next();
};

export default loggerMiddleware;
