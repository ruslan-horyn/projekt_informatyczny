import { isValidObjectId, Model } from 'mongoose';

import {
  RoleIdNotFindException,
  RoleNotFind,
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
      throw new RoleNotFind();
    }

    return role;
  }

  async createRole(name: string): Promise<Role> {
    return this.model.create({ name });
  }

  async deleteRole(id: string): Promise<void> {
    if (!isValidObjectId(id)) {
      throw new RoleIdNotFindException(id);
    }

    const role = await this.model.findByIdAndDelete(id);

    if (!role) {
      throw new RoleNotFind();
    }
  }
}
