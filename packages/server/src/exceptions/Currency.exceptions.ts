/* eslint-disable max-classes-per-file */
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
