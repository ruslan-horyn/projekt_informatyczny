import { HttpException } from './HttpException';

export class NoPermissionException extends HttpException {
  constructor() {
    super('You don\'t have permission', 403);
  }
}
