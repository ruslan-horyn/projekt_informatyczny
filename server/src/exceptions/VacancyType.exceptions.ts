import { HttpException } from './HttpException';

export class VacancyTypeIdIsIncorrectException extends HttpException {
  constructor(id: string) {
    super(404, `The vacancyType id ${id} is incorrect`);
  }
}

export class VacancyTypeNotFoundException extends HttpException {
  constructor() {
    super(404, 'The vacancyType not found');
  }
}

export class VacancyTypeIsExistsException extends HttpException {
  constructor(name: string) {
    super(404, `The user with name '${name}' is already exists`);
  }
}
