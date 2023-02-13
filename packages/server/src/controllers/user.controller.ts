import { Response, Router } from 'express';
import asyncHandler from 'express-async-handler';

import { UserDto } from '../dto';
import { authMiddleware, validationMiddleware } from '../middleware';
import { UserService } from '../services';
import {
  Controller, IdType, User, UserRequest,
} from '../types';

export class UserController implements Controller {
  path = '/users';

  router = Router();

  private userService = new UserService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .all(`${this.path}`, authMiddleware)
      .all(`${this.path}/:id`, authMiddleware)
      .get(`${this.path}`, asyncHandler(this.getAll))
      .get(`${this.path}/:id`, asyncHandler(this.getById))
      .delete(`${this.path}/:id`, asyncHandler(this.delete))
      .post(
        this.path,
        validationMiddleware(UserDto),
        asyncHandler(this.create),
      )
      .patch(
        `${this.path}/:id`,
        validationMiddleware(UserDto, true),
        asyncHandler(this.update),
      );
  }

  private getAll = async (_req: UserRequest, res: Response) => {
    const users = await this.userService.getAll();
    res.json(users);
  };

  private getById = async (req: UserRequest<IdType>, res: Response) => {
    const { id } = req.params;
    const user = await this.userService.getById(id);
    user.password = '';
    res.json(user);
  };

  private delete = async (req: UserRequest<IdType>, res: Response) => {
    const { id } = req.params;
    await this.userService.delete(id);
    res.sendStatus(200);
  };

  private create = async (req: UserRequest<unknown, User>, res: Response) => {
    const { body } = req;
    const user = await this.userService.create(body);
    user.password = '';
    res.status(201)
      .json(user);
  };

  private update = async (req: UserRequest<IdType, User>, res: Response) => {
    const { id } = req.params;
    const user = await this.userService.update(id, req.body);
    user.password = '';
    res.json(user);
  };
}
