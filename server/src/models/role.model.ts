import { model, Schema } from 'mongoose';
import { RoleI } from '../types';

const RoleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
 
}, { timestamps: true });

export const RoleModel = model<RoleI>('Role', RoleSchema);
