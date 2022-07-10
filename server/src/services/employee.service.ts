import { Model } from 'mongoose';

import {
  EmployeeIdIsIncorrectException,
  EmployeeIsExistsException,
  EmployeeNotFoundException,
} from '../exceptions';
import { EmployeeModel } from '../models';
import { Employee } from '../types';

export class EmployeeService {
  private readonly model: Model<Employee>;

  constructor() {
    this.model = EmployeeModel;
  }

  public async getAllEmployees() {
    return EmployeeModel.find();
  }

  public async getEmployeeById(id: string) {
    const employee = await this.model.findById(id);

    if (!employee) {
      throw new EmployeeNotFoundException();
    }

    return employee;
  }

  public async createEmployee(data: Employee) {
    const {
      email, ...rest
    } = data;

    const employee = await this.model.findOne({ email });

    if (employee) {
      throw new EmployeeIsExistsException(email);
    }

    return EmployeeModel.create({
      email,
      ...rest,
    });
  }

  public async updateEmployee(id: string, employee: Employee) {
    if (!id) {
      throw new EmployeeIdIsIncorrectException(id);
    }

    return this.model.findByIdAndUpdate(id, employee, { new: true });
  }

  public async deleteEmployee(id: string) {
    if (!id) {
      throw new EmployeeIdIsIncorrectException(id);
    }

    const employee = await this.model.findByIdAndDelete(id);

    if (!employee) {
      throw new EmployeeNotFoundException();
    }

    return employee;
  }
}
