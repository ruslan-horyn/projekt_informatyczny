import { HttpException } from './HttpException';

export class CurrencyIdIsIncorrectException extends HttpException {
  constructor(id: string) {
    super(`The currency id ${id} is incorrect`);
  }
}

export class CurrencyNotFoundException extends HttpException {
  constructor() {
    super('The currency not found');
  }
}

export class CurrencyIsExistsException extends HttpException {
  constructor(name: string) {
    super(`The user with name '${name}' is already exists`);
  }
}
