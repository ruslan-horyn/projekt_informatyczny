import { HttpException } from './HttpException';

export class AddressIdIsIncorrectException extends HttpException {
  constructor(id: string) {
    super(404, `The address id ${id} is incorrect`);
  }
}

export class AddressIsExistsException extends HttpException {
  constructor() {
    super(404, 'The address is already exists');
  }
}

export class AddressNotFoundException extends HttpException {
  constructor() {
    super(404, 'The address not found');
  }
}
