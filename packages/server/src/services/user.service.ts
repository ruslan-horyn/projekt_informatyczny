import { isValidObjectId, Model } from 'mongoose';
import {
  UserIdIsIncorrectException,
  UserNotFoundException,
} from '../exceptions';
import { UserModel } from '../models';
import { User } from '../types';
import { hashedPassword } from '../utils/password';

export class UserService {
  private readonly userModel: Model<User> = UserModel;

  async getAll(): Promise<User[]> {
    return this.userModel.find()
      .populate('roles')
      .select('-password');
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email })
      .populate('roles');

    if (!user) {
      throw new UserNotFoundException();
    }

    return user.toJSON() as User;
  }

  async getById(id: string): Promise<User> {
    if (!isValidObjectId(id)) {
      throw new UserIdIsIncorrectException(id);
    }

    const user = await this.userModel.findById(id)
      .populate('roles')
      .select('-password');

    if (!user) {
      throw new UserNotFoundException();
    }

    return user.toJSON() as User;
  }

  async create(data: User): Promise<User> {
    const {
      password, ...rest
    } = data;

    const hashPassword = await hashedPassword(password);

    return this.userModel.create({
      ...rest,
      password: hashPassword,
    })
      .then((u) => u.populate('roles'));
  }

  async delete(id: string): Promise<void> {
    if (!isValidObjectId(id)) {
      throw new UserIdIsIncorrectException(id);
    }

    const user = await this.userModel.findByIdAndDelete(id);

    if (!user) {
      throw new UserNotFoundException();
    }
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    if (!isValidObjectId(id)) {
      throw new UserIdIsIncorrectException(id);
    }

    const copyUser = { ...data };

    if (copyUser.password) {
      copyUser.password = await hashedPassword(copyUser.password);
    }

    const user = await this.userModel
      .findByIdAndUpdate(id, copyUser, { new: true })
      .populate('roles')
      .select('-password');

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }
}
