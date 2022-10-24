import { model, Schema } from 'mongoose';

import { Employee, TransformType } from '../types';

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
  toJSON: {
    transform(_doc, ret: TransformType) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
});

export const EmployeeModel = model<Employee>('Employee', EmployeeSchema);
