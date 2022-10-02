import { HttpException } from './HttpException';

export class NotAuthorizationTokenException extends HttpException {
  constructor() {
    super(401, 'Not authorized or no token');
  }
}
