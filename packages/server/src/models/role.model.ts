import { model, Schema } from 'mongoose';

import { Role, TransformType } from '../types';
import { transformDoc } from './helper/transaform';

const RoleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
}, {
  timestamps: true,
  toJSON: {
    transform(_doc, ret: TransformType) {
      transformDoc(_doc, ret);
    },
  },
});

export const RoleModel = model<Role>('Role', RoleSchema);
