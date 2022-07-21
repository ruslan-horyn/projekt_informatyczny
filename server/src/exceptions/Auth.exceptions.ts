import { HttpException } from './HttpException';

export class EnterRequiredFieldException extends HttpException {
  constructor() {
    super(404, 'Please enter a required fields');
  }
}

export class NotAuthorisationTokenException extends HttpException {
  constructor() {
    super(401, 'Not authorized or no token');
  }
}
