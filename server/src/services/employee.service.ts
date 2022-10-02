import { isValidObjectId, Model } from 'mongoose';

import {
  EmployeeIdIsIncorrectException,
  EmployeeIsExistsException,
  EmployeeNotFoundException,
} from '../exceptions';
import { EmployeeModel } from '../models';
import { Employee } from '../types';

export class EmployeeService {
  private readonly employeeModel: Model<Employee> = EmployeeModel;

  async getAll(): Promise<Employee[]> {
    return this.employeeModel.find();
  }

  async getById(id: string): Promise<Employee> {
    const employee = await this.employeeModel.findById(id);

    if (!employee) {
      throw new EmployeeNotFoundException();
    }

    return employee;
  }

  async create(data: Employee): Promise<Employee> {
    const {
      email, ...rest
    } = data;

    const employee = await this.employeeModel.findOne({ email });

    if (employee) {
      throw new EmployeeIsExistsException(email);
    }

    return this.employeeModel.create({
      email,
      ...rest,
    });
  }

  async update(id: string, data: Employee): Promise<Employee> {
    if (!isValidObjectId(id)) {
      throw new EmployeeIdIsIncorrectException(id);
    }

    const employee = await this.employeeModel.findByIdAndUpdate(id, data, { new: true });

    if (!employee) {
      throw new EmployeeNotFoundException();
    }

    return employee;
  }

  async delete(id: string): Promise<void> {
    if (!isValidObjectId(id)) {
      throw new EmployeeIdIsIncorrectException(id);
    }

    const employee = await this.employeeModel.findByIdAndDelete(id);

    if (!employee) {
      throw new EmployeeNotFoundException();
    }
  }
}
