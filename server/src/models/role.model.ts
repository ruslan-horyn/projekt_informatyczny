import { model, Schema } from 'mongoose';
import { RoleI } from '../types/role.type';

const RoleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
 
}, { timestamps: true });

const RoleModel = model<RoleI>('Role', RoleSchema);
export default RoleModel;
