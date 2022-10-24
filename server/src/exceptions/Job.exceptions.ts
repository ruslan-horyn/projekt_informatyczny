import { HttpException } from './HttpException';

export class JobIdNotFindException extends HttpException {
  constructor(id: string) {
    super(`Job with id ${id} not found`);
  }
}

export class JobNotFind extends HttpException {
  constructor() {
    super('Job not found');
  }
}
