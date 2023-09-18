import { isValidObjectId, Model } from 'mongoose';

import {
  RoleIdNotFindException,
  RoleNotFound,
} from '../exceptions';
import { RoleModel } from '../models';
import { Role } from '../types';

export class RoleService {
  private readonly model: Model<Role> = RoleModel;

  async getAllRoles(): Promise<Role[]> {
    return this.model.find<Role>();
  }

  async getRoleById(id: string): Promise<Role> {
    if (!isValidObjectId(id)) {
      throw new RoleIdNotFindException(id);
    }

    const role = await this.model.findById(id);

    if (!role) {
      throw new RoleNotFound();
    }

    return role;
  }
}
