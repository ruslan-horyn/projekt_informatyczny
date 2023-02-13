import { HttpException } from './HttpException';

export class NotAuthorizationTokenException extends HttpException {
  constructor() {
    super('Not authorized or no token', 401);
  }
}
