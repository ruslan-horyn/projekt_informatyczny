import { model, Schema } from 'mongoose';

import { Employee, TransformType } from '../types';
import { transformDoc } from './helper/transaform';

export const EmployeeSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  documentIdNumber: { type: String, required: true, unique: true },
  visaStart: { type: String, required: true },
  visaEnd: { type: String, required: true },
  address: { type: Schema.Types.ObjectId, ref: 'Address' },
}, {
  timestamps: true,
  toJSON: {
    transform(_doc, ret: TransformType) {
      transformDoc(_doc, ret);
    },
  },
});

export const EmployeeModel = model<Employee>('Employee', EmployeeSchema);
