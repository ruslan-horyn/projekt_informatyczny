import { model, Schema } from 'mongoose';

import { Role } from '../types';

const RoleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

}, { timestamps: true });

export const RoleModel = model<Role>('Role', RoleSchema);
