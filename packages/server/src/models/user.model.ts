import { model, Schema } from 'mongoose';

import { TransformType, User } from '../types';
import { transformDoc } from './helper/transaform';

export const UserSchema = new Schema<User>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: [{
    ref: 'Role',
    type: Schema.Types.ObjectId,
    required: true,
  }],
}, {
  timestamps: true,
  toJSON: {
    transform(_doc, ret: TransformType) {
      transformDoc(_doc, ret);
    },
  },
});

export const UserModel = model('User', UserSchema);
