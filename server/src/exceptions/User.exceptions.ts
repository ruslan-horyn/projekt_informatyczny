import { HttpException } from './HttpException';

export class UserIsExistsException extends HttpException {
  constructor(email: string) {
    super(404, `The user with email '${email}' is already exists`);
  }
}

export class UserIdIsIncorrectException extends HttpException {
  constructor(id: string) {
    super(404, `The user id ${id} is incorrect`);
  }
}

export class UserNotFoundException extends HttpException {
  constructor() {
    super(404, 'The user not found');
  }
}

export class UserPassIsInvalidException extends HttpException {
  constructor() {
    super(404, 'The user password is incorrect');
  }
}
