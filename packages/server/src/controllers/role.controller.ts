import { Response } from 'express';
import { RoleService } from '../services/role.service';
import {
  IdType,
  Role,
  UserRequest,
} from '../types';

export class RoleController {
  constructor(
    private readonly roleService: RoleService,
  ) {}

  getAll = async (_req: UserRequest, res: Response<Role[]>): Promise<void> => {
    const roles = await this.roleService.getAllRoles();
    res.json(roles);
  };

  getById = async (req: UserRequest<IdType>, res: Response<Role>): Promise<void> => {
    const { id } = req.params;
    const role = await this.roleService.getRoleById(id);
    res.json(role);
  };
}
