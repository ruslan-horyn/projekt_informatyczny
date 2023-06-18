import { Response } from 'express';
import { UserService } from '../services/user.service';
import {
  IdType, User, UserRequest,
} from '../types';

export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  getAll = async (_req: UserRequest, res: Response): Promise<void> => {
    const users = await this.userService.getAll();
    res.json(users);
  };

  getById = async (req: UserRequest<IdType>, res: Response): Promise<void> => {
    const { id } = req.params;
    const { password: _pas, ...user } = await this.userService.getById(id);
    res.json(user);
  };

  delete = async (req: UserRequest<IdType>, res: Response): Promise<void> => {
    const { id } = req.params;
    await this.userService.delete(id);
    res.sendStatus(200);
  };

  create = async (req: UserRequest<unknown, User>, res: Response): Promise<void> => {
    const { body } = req;
    const { password: _pas, ...user } = await this.userService.create(body);
    res.status(201)
      .json(user);
  };

  update = async (req: UserRequest<IdType, User>, res: Response): Promise<void> => {
    const { id } = req.params;
    const { password: _pas, ...user } = await this.userService.update(id, req.body);
    res.json(user);
  };
}
