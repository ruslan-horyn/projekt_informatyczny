import { model, Schema } from 'mongoose';
import { UserI } from '../types/user.type';

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

const UserModel = model<UserI>('User', UserSchema);
export default UserModel;
