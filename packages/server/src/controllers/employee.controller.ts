import { Response, Router } from 'express';
import asyncHandler from 'express-async-handler';

import { EmployeeDto } from '../dto';
import { authMiddleware, validationMiddleware } from '../middleware';
import { EmployeeService } from '../services';
import {
  Controller, Employee, IdType, UserRequest,
} from '../types';

export class EmployeeController implements Controller {
  readonly path = '/employee';

  readonly router = Router();

  private employeeService: EmployeeService = new EmployeeService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router
      .all(`${this.path}`, authMiddleware)
      .all(`${this.path}/*`, authMiddleware)
      .get(`${this.path}`, asyncHandler(this.getAll))
      .get(`${this.path}/:id`, asyncHandler(this.getById))
      .delete(`${this.path}/:id`, asyncHandler(this.delete))
      .post(
        `${this.path}`,
        validationMiddleware(EmployeeDto),
        asyncHandler(this.create),
      )
      .patch(
        `${this.path}/:id`,
        validationMiddleware(EmployeeDto, true),
        asyncHandler(this.update),
      );
  };

  private getAll = async (_req: UserRequest, res: Response<Employee[]>) => {
    const employee = await this.employeeService.getAll();
    res.json(employee);
  };

  private getById = async (req: UserRequest<IdType>, res: Response<Employee>) => {
    const { id } = req.params;
    const employee = await this.employeeService.getById(id);
    res.json(employee);
  };

  private create = async (req: UserRequest, res: Response<Employee>) => {
    const employee = await this.employeeService.create(req.body as Employee);
    res.json(employee);
  };

  private update = async (req: UserRequest<IdType, Employee>, res: Response<Employee>) => {
    const { id } = req.params;
    const employee = req.body;
    const newOne = await this.employeeService.update(id, employee);
    res.json(newOne);
  };

  private delete = async (req: UserRequest<IdType>, res: Response) => {
    const { id } = req.params;
    await this.employeeService.delete(id);
    res.sendStatus(200);
  };
}
