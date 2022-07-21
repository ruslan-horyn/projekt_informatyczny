import { HttpException } from './HttpException';

export class EmployeeIsExistsException extends HttpException {
  constructor(email: string) {
    super(404, `The employee with email '${email}' is already exists`);
  }
}

export class EmployeeIdIsIncorrectException extends HttpException {
  constructor(id: string) {
    super(404, `The employee id ${id} is incorrect`);
  }
}
export class EmployeeAddressNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `The address employee id ${id} not found`);
  }
}

export class EmployeeNotFoundException extends HttpException {
  constructor() {
    super(404, 'The employee not found');
  }
}
