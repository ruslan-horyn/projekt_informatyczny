import { HttpException } from './HttpException';

export class AddressIdIsIncorrectException extends HttpException {
  constructor(id: string) {
    super(`The address id ${id} is incorrect`);
  }
}

export class AddressIsExistsException extends HttpException {
  constructor() {
    super('The address is already exists');
  }
}

export class AddressNotFoundException extends HttpException {
  constructor() {
    super('The address not found');
  }
}
