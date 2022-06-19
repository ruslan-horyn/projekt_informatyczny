import { Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import { CreateUserDto } from '../dto';
import { authMiddleware, validationMiddleware } from '../middleware';
import { UserService } from '../services';
import { RequestWithUserI, ControllerI, UserI } from '../types';

export class UserController implements ControllerI {
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
  
  private getAllUsers = async (_req: RequestWithUserI, res: Response) => {
    const users = await this.userService.getAllUsers();
    res.json(users);
  };
  
  private getUserById = async (req: RequestWithUserI, res: Response) => {
    const { id } = req.params;
    const user = await this.userService.getUserById(id);
    res.json(user);
  };
  
  private deleteUser = async (req: RequestWithUserI, res: Response) => {
    const { id } = req.params;
    const user = await this.userService.deleteUser(id);
    res.status(200)
      .json({ message: 'User deleted successfully', user });
  };
  
  private createUser = async (req: RequestWithUserI, res: Response) => {
    const user = await this.userService.createUser(req.body as UserI);
    res.status(201)
      .json(user);
  };
}
