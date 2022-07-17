import { Response, Router } from 'express';
import asyncHandler from 'express-async-handler';

import { CreateUserDto } from '../dto';
import { authMiddleware, validationMiddleware } from '../middleware';
import { UserService } from '../services';
import { Controller, RequestWithUser, User } from '../types';

export class UserController implements Controller {
  public path = '/users';

  public router = Router();

  private userService = new UserService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .all(`${this.path}`, authMiddleware)
      .all(`${this.path}/:id`, authMiddleware)
      .get(`${this.path}`, asyncHandler(this.getAllUsers))
      .get(`${this.path}/:id`, asyncHandler(this.getUserById))
      .delete(`${this.path}/:id`, asyncHandler(this.deleteUser))
      .post(
        this.path,
        validationMiddleware(CreateUserDto),
        asyncHandler(this.createUser),
      )
      .patch(
        `${this.path}/:id`,
        validationMiddleware(CreateUserDto, true),
        asyncHandler(this.updateUser),
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
    const body = req.body as User;
    const user = await this.userService.createUser(body);
    res.status(201)
      .json(user);
  };

  private updateUser = async (req: RequestWithUser, res: Response) => {
    const { id } = req.params;
    const user = req.body as User;
    const userNew = await this.userService.updateUser(id, user);
    res.json(userNew);
  };
}
