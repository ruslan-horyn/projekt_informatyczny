import { Response } from 'express';
import { EmployeeService } from '../services/employee.service';
import type {
  Employee, IdType, UserRequest,
} from '../types';

export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
  ) {}

  getAll = async (_req: UserRequest, res: Response<Employee[]>): Promise<void> => {
    const employee = await this.employeeService.getAll();
    res.json(employee);
  };

  getById = async (req: UserRequest<IdType>, res: Response<Employee>): Promise<void> => {
    const { id } = req.params;
    const employee = await this.employeeService.getById(id);
    res.json(employee);
  };

  create = async (req: UserRequest, res: Response<Employee>): Promise<void> => {
    const employee = await this.employeeService.create(req.body as Employee);
    res.json(employee);
  };

  update = async (req: UserRequest<IdType, Employee>, res: Response<Employee>): Promise<void> => {
    const { id } = req.params;
    const employee = req.body;
    const newOne = await this.employeeService.update(id, employee);
    res.json(newOne);
  };

  delete = async (req: UserRequest<IdType>, res: Response): Promise<void> => {
    const { id } = req.params;
    await this.employeeService.delete(id);
    res.sendStatus(200);
  };
}
