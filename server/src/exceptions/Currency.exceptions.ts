import { HttpException } from './HttpException';

export class CurrencyIdIsIncorrectException extends HttpException {
  constructor(id: string) {
    super(404, `The currency id ${id} is incorrect`);
  }
}

export class CurrencyNotFoundException extends HttpException {
  constructor() {
    super(404, 'The currency not found');
  }
}

export class CurrencyIsExistsException extends HttpException {
  constructor(name: string) {
    super(404, `The user with name '${name}' is already exists`);
  }
}
