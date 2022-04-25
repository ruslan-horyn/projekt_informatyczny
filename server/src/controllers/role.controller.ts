import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import ControllerI from '../types/controller.type';
import CreateRoleDto from '../dto/role.dto';
import authMiddleware from '../middleware/auth.middleware';
import validationMiddleware from '../middleware/validation.middleware';
import RoleService from '../services/role.service';

export class RoleController implements ControllerI {
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
    const { name } = req.body;
    const role = await this.roleService.createRole(name);
    res.send(role);
  };
  
  public deleteRole = async (req: Request, res: Response) => {
    const { id } = req.params;
    const role = await this.roleService.deleteRole(id);
    res.json({ message: 'success', role });
  };
}

export default RoleController;
