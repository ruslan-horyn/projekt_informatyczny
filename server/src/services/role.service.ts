import { Model } from 'mongoose';
import {
  RoleIdNotFindException,
  RoleNotFind,
} from '../exceptions/Role.exceptions';
import { RoleI } from '../types/role.type';
import RoleModel from '../models/role.model';

class RoleService {
  private readonly model: Model<RoleI>;
  
  constructor() {
    this.model = RoleModel;
  }
  
  async getAllRoles() {
    return this.model.find();
  }
  
  async getRoleById(id: string) {
    if (!id) {
      throw new RoleIdNotFindException(id);
    }

    const role = await this.model.findById(id);

    if (!role) {
      throw new RoleNotFind();
    }

    return role;
  }
  
  async createRole(name: string) {
    return this.model.create({ name });
  }
  
  async deleteRole(id: string) {
    if (!id) {
      throw new RoleIdNotFindException(id);
    }

    const role = await this.model.findByIdAndDelete(id);

    if (!role) {
      throw new RoleNotFind();
    }

    return role;
  }
}

export default RoleService;
