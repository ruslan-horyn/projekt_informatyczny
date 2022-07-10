import { Model } from 'mongoose';

import {
  EmployeeAddressNotFoundException,
  EmployeeIdIsIncorrectException,
  EmployeeIsExistsException,
  EmployeeNotFoundException,
} from '../exceptions';
import { EmployeeAddressModel, EmployeeModel } from '../models';
import { Employee, EmployeeAddress } from '../types';

export class EmployeeService {
  private readonly employeeModel: Model<Employee>;

  private readonly employeeAddressModel: Model<EmployeeAddress>;

  constructor() {
    this.employeeModel = EmployeeModel;
    this.employeeAddressModel = EmployeeAddressModel;
  }

  public async getAllEmployees() {
    return this.employeeModel.find();
  }

  public async getEmployeeById(id: string) {
    const employee = await this.employeeModel.findById(id);

    if (!employee) {
      throw new EmployeeNotFoundException();
    }

    return employee;
  }

  public async createEmployee(data: Employee) {
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

  public async updateEmployee(id: string, employee: Employee) {
    if (!id) {
      throw new EmployeeIdIsIncorrectException(id);
    }

    return this.employeeModel.findByIdAndUpdate(id, employee, { new: true });
  }

  public async deleteEmployee(id: string) {
    if (!id) {
      throw new EmployeeIdIsIncorrectException(id);
    }

    const employee = await this.employeeModel.findByIdAndDelete(id);

    if (!employee) {
      throw new EmployeeNotFoundException();
    }

    return employee;
  }

  public async getEmployeeAddress(id: string) {
    const address = await this.employeeAddressModel.find({ idEmployee: id });

    if (!address) {
      throw new EmployeeAddressNotFoundException(id);
    }

    return address;
  }
}
