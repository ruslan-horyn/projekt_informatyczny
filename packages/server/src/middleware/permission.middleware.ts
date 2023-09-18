import { NextFunction, Response } from 'express';
import { NoPermissionException } from '../exceptions/Permission.exception';
import { RoleName, UserRequest } from '../types';

export const permissionMiddleware = (roles: RoleName[] = []) => (
  req: UserRequest,
  _res: Response,
  next: NextFunction,
) => {
  const superAdminRole: RoleName = 'super-admin';
  const userRoles = req.user?.roles ?? [];

  const hasPermission = userRoles.some(
    ({ name }) => roles.includes(name) || name === superAdminRole,
  );

  if (!hasPermission) {
    throw new NoPermissionException();
  }

  next();
};
