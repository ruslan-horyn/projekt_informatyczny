import { HttpException } from './HttpException';

export class VacancyIdIsIncorrectException extends HttpException {
  constructor(id: string) {
    super(404, `The vacancy id ${id} is incorrect`);
  }
}

export class VacancyNotFoundException extends HttpException {
  constructor() {
    super(404, 'The vacancy not found');
  }
}

export class VacancyCreateErrorException extends HttpException {
  constructor() {
    super(404, 'Unexpected error while creating vacancy');
  }
}
