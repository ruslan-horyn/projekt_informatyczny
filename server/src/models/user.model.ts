import { model, Schema } from 'mongoose';

import { TransformType, User } from '../types';

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
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
});

export const UserModel = model<User>('User', UserSchema);
