import { isValidObjectId, Model } from 'mongoose';
import {
  UserIdIsIncorrectException,
  UserIsExistsException,
  UserNotFoundException,
  UserPassIsInvalidException,
} from '../exceptions';
import { UserModel } from '../models';
import { User } from '../types';
import { hashedPassword } from '../utils';

export class UserService {
  private readonly userModel: Model<User> = UserModel;

  async getAll(): Promise<User[]> {
    return this.userModel.find()
      .populate('roles')
      .select('-password');
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne<User>({ email });

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async getById(id: string): Promise<User> {
    if (!isValidObjectId(id)) {
      throw new UserIdIsIncorrectException(id);
    }

    const user = await this.userModel.findById(id);

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async create(data: User): Promise<User> {
    const {
      password, confirm, email, ...rest
    } = data;

    if (password !== confirm) {
      throw new UserPassIsInvalidException();
    }

    const user = await this.userModel.findOne<User>({ email });

    if (user) {
      throw new UserIsExistsException(email);
    }

    const hashPassword = await hashedPassword(password);

    return this.userModel.create({
      ...rest,
      email,
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
      .populate('roles');

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }
}
