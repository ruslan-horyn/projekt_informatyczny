import {
  UserIdIsIncorrectException,
  UserIsExistsException,
  UserNotFoundException, UserPassIsInvalidException,
} from '../exceptions/User.exceptions';
import { UserI } from '../types/user.type';
import UserModel from '../models/user.model';
import { hashedPassword } from '../utils/password';

class UserService {
  public async getAllUsers() {
    return UserModel.find().select('-password');
  }
  
  public async getUserByEmail(email: string) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  public async getUserById(id: string) {
    if (!id) {
      throw new UserIdIsIncorrectException(id);
    }
    const user = await UserModel.findById(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }
  
  public async createUser(data: UserI) {
    const {
      password, confirm, email, ...rest
    } = data as UserI;
    
    const user = await UserModel.findOne({ email });
    if (user) {
      throw new UserIsExistsException(email);
    } else if (password !== confirm) {
      throw new UserPassIsInvalidException();
    }
    
    const hashPassword = await hashedPassword(password);
    return UserModel.create({
      ...rest,
      email,
      password: hashPassword,
    });
  }
  
  async deleteUser(id: string) {
    if (!id) {
      throw new UserIdIsIncorrectException(id);
    }
    const user = UserModel.findByIdAndDelete(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }
}

export default UserService;