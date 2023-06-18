import { NextFunction, Response } from 'express';
import { NoPermissionException } from '../exceptions/Permission.exception';
import { RoleName, UserRequest } from '../types';

export const permissionMiddleware = (roles: RoleName[] = []) => (
  req: UserRequest,
  _res: Response,
  next: NextFunction,
) => {
  const userRoles = req.user?.roles ?? [];

  const hasPermission = userRoles.some((role) => roles.includes(role));
  const hasSuperAdminRole = userRoles.includes('superadmin');

  if (!hasPermission || !hasSuperAdminRole) {
    throw new NoPermissionException();
  }

  next();
};
