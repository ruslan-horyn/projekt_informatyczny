import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';

import { CreateRoleDto } from '../dto';
import { authMiddleware, validationMiddleware } from '../middleware';
import { RoleService } from '../services';
import { Controller, Role } from '../types';

export class RoleController implements Controller {
  public readonly path = '/roles';

  public readonly router = Router();

  private roleService = new RoleService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .all(`${this.path}`, authMiddleware)
      .all(`${this.path}/*`, authMiddleware)
      .get(this.path, asyncHandler(this.getAllRoles))
      .get(`${this.path}/:id`, asyncHandler(this.getRoleById))
      .delete(`${this.path}/:id`, asyncHandler(this.deleteRole))
      .post(
        this.path,
        validationMiddleware(CreateRoleDto),
        asyncHandler(this.createRole),
      );
  }

  public getAllRoles = async (_req: Request, res: Response) => {
    const roles = await this.roleService.getAllRoles();
    res.send(roles);
  };

  public getRoleById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const role = await this.roleService.getRoleById(id);
    res.send(role);
  };

  public createRole = async (req: Request, res: Response) => {
    const { name } = req.body as Role;
    const role = await this.roleService.createRole(name);
    res.send(role);
  };

  public deleteRole = async (req: Request, res: Response) => {
    const { id } = req.params;
    const role = await this.roleService.deleteRole(id);
    res.json({ message: 'success', role });
  };
}
