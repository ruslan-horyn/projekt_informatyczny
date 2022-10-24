import { HttpException } from './HttpException';

export class RoleIdNotFindException extends HttpException {
  constructor(id: string) {
    super(`Role ${id} not found`);
  }
}
export class RoleNotFind extends HttpException {
  constructor() {
    super('Role not found');
  }
}
