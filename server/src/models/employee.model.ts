import { model, Schema } from 'mongoose';

import { Employee } from '../types';

export const EmployeeSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passportSerialNumber: { type: String, required: true, unique: true },
  visaStart: { type: String, required: true },
  visaEnd: { type: String, required: true },
}, {
  timestamps: true,
});

export const EmployeeModel = model<Employee>('Employee', EmployeeSchema);
