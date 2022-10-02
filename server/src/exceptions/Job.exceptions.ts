import { HttpException } from './HttpException';

export class JobIdNotFindException extends HttpException {
  constructor(id: string) {
    super(404, `Job with id ${id} not found`);
  }
}

export class JobNotFind extends HttpException {
  constructor() {
    super(404, 'Job not found');
  }
}
