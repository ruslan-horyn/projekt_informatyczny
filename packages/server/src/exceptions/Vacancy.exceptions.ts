import { HttpException } from './HttpException';

export class VacancyIdIsIncorrectException extends HttpException {
  constructor(id: string) {
    super(`The vacancy id ${id} is incorrect`);
  }
}

export class VacancyNotFoundException extends HttpException {
  constructor() {
    super('The vacancy not found');
  }
}

export class VacancyCreateErrorException extends HttpException {
  constructor() {
    super('Unexpected error while creating vacancy');
  }
}
