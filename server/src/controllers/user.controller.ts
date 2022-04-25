import { Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import CreateUserDto from '../dto/user.dto';
import authMiddleware from '../middleware/auth.middleware';
import validationMiddleware from '../middleware/validation.middleware';
import UserService from '../services/user.service';
import { RequestWithUser } from '../types/auth.type';
import ControllerI from '../types/controller.type';
import { UserI } from '../types/user.type';

class UserController implements ControllerI {
  public path: string = '/users';
  
  public router = Router();
  
  private userService = new UserService();
  
  constructor() {
    this.initializeRoutes();
  }
  
  private initializeRoutes() {
    this.router
      .all(`${this.path}`, authMiddleware)
      .all(`${this.path}/*`, authMiddleware)
      .get(`${this.path}`, asyncHandler(this.getAllUsers))
      .get(`${this.path}/:id`, asyncHandler(this.getUserById))
      .delete(`${this.path}/:id`, asyncHandler(this.deleteUser))
      .post(
        this.path,
        validationMiddleware(CreateUserDto),
        asyncHandler(this.createUser),
      );
  }
  
  private getAllUsers = async (_req: RequestWithUser, res: Response) => {
    const users = await this.userService.getAllUsers();
    res.json(users);
  };
  
  private getUserById = async (req: RequestWithUser, res: Response) => {
    const { id } = req.params;
    const user = await this.userService.getUserById(id);
    res.json(user);
  };
  
  private deleteUser = async (req: RequestWithUser, res: Response) => {
    const { id } = req.params;
    const user = await this.userService.deleteUser(id);
    res.status(200)
      .json({ message: 'User deleted successfully', user });
  };
  
  private createUser = async (req: RequestWithUser, res: Response) => {
    const user = await this.userService.createUser(req.body as UserI);
    res.status(201)
      .json(user);
  };
}

export default UserController;
