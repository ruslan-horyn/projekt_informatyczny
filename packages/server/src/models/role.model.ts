import { model, Schema } from 'mongoose';

import { Role, TransformType } from '../types';

const RoleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
  toJSON: {
    transform(_doc, ret: TransformType) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
});

export const RoleModel = model<Role>('Role', RoleSchema);
