import { HttpException } from './HttpException';

export class RoleIdNotFindException extends HttpException {
  constructor(id: string) {
    super(`Role ${id} not found`);
  }
}
export class RoleNotFound extends HttpException {
  constructor() {
    super('Role not found');
  }
}
