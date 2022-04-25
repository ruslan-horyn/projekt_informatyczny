import HttpException from './HttpException';

export class RoleIdNotFindException extends HttpException {
  constructor(id: unknown) {
    super(404, `Role ${id} not found`);
  }
}
export class RoleNotFind extends HttpException {
  constructor() {
    super(404, 'Role not found');
  }
}
