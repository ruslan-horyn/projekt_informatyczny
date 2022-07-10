import { model, Schema } from 'mongoose';

import { EmployeeAddress } from '../types';

export const EmployeeAddressSchema = new Schema<EmployeeAddress>({
  start: { type: String, required: true },
  end: { type: String, required: true },
  location: { type: String, required: true },
  zcode: { type: String, required: true },
  street: { type: String, required: true },
  house: { type: String, required: true },
  local: { type: String },
  idEmployee: { type: Schema.Types.ObjectId, required: true, ref: 'Employee' },
}, {
  timestamps: true,
});

export const EmployeeAddressModel = model<EmployeeAddress>('EmployeeAddress', EmployeeAddressSchema);
