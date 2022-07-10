import { Response, Router } from 'express';
import asyncHandler from 'express-async-handler';

import { CreateEmployeeDto } from '../dto';
import { authMiddleware, validationMiddleware } from '../middleware';
import { EmployeeService } from '../services/employee.service';
import {
  Controller, Employee, RequestWithUser,
} from '../types';

export class EmployeeController implements Controller {
  public readonly path = '/employee';

  public readonly router = Router();

  private employeeService: EmployeeService = new EmployeeService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router
      .get(`${this.path}`, authMiddleware, asyncHandler(this.getAllEmployees))
      .get(`${this.path}/:id`, asyncHandler(this.getEmployeeById))
      .get(`${this.path}/address/:id`, asyncHandler(this.getEmployeeAddress))
      .delete(`${this.path}/:id`, asyncHandler(this.deleteEmployee))
      .post(
        `${this.path}`,
        validationMiddleware(CreateEmployeeDto),
        asyncHandler(this.createEmployee),
      )
      .patch(
        `${this.path}/:id`,
        validationMiddleware(CreateEmployeeDto, true),
        asyncHandler(this.updateEmployee),
      );
  };

  private getAllEmployees = async (_req: RequestWithUser, res: Response) => {
    const employee = await this.employeeService.getAllEmployees();
    res.json(employee);
  };

  private getEmployeeById = async (req: RequestWithUser, res: Response) => {
    const { id } = req.params;
    const employee = await this.employeeService.getEmployeeById(id);
    res.json(employee);
  };

  private getEmployeeAddress = async (req: RequestWithUser, res: Response) => {
    const { id } = req.params;
    const employee = await this.employeeService.getEmployeeAddress(id);
    res.json(employee);
  };

  private createEmployee = async (req: RequestWithUser, res: Response) => {
    const employee = await this.employeeService.createEmployee(req.body as Employee);
    res.json(employee);
  };

  private updateEmployee = async (req: RequestWithUser, res: Response) => {
    const { id } = req.params;
    const employee = req.body as Employee;
    const employeeNew = await this.employeeService.updateEmployee(id, employee);
    res.json(employeeNew);
  };

  private deleteEmployee = async (req: RequestWithUser, res: Response) => {
    const { id } = req.params;
    const employee = await this.employeeService.deleteEmployee(id);
    res.json(employee);
  };
}
