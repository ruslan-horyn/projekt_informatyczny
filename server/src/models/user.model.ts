import { model, Schema } from 'mongoose';

import { User } from '../types';

export const UserSchema = new Schema({
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
});

export const UserModel = model<User>('User', UserSchema);
