import { Response, Router } from 'express';
import asyncHandler from 'express-async-handler';

import { RoleDto } from '../dto';
import { authMiddleware, validationMiddleware } from '../middleware';
import { RoleService } from '../services';
import {
  Controller,
  IdType,
  Role,
  UserRequest,
} from '../types';

export class RoleController implements Controller {
  readonly path = '/roles';

  readonly router = Router();

  private roleService = new RoleService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .all(`${this.path}`, authMiddleware)
      .all(`${this.path}/*`, authMiddleware)
      .get(this.path, asyncHandler(this.getAll))
      .get(`${this.path}/:id`, asyncHandler(this.getById))
      .delete(`${this.path}/:id`, asyncHandler(this.delete))
      .post(
        this.path,
        validationMiddleware(RoleDto),
        asyncHandler(this.create),
      );
  }

  private getAll = async (_req: UserRequest, res: Response<Role[]>) => {
    const roles = await this.roleService.getAllRoles();
    res.json(roles);
  };

  private getById = async (req: UserRequest<IdType>, res: Response<Role>) => {
    const { id } = req.params;
    const role = await this.roleService.getRoleById(id);
    res.json(role);
  };

  private create = async (req: UserRequest<unknown, Role>, res: Response<Role>) => {
    const { name } = req.body;
    const role = await this.roleService.createRole(name);
    res.json(role);
  };

  private delete = async (req: UserRequest<IdType>, res: Response) => {
    const { id } = req.params;
    await this.roleService.deleteRole(id);
    res.sendStatus(200);
  };
}
