import { model, Schema } from 'mongoose';

import { JobWithAddress } from '../types';

export const JobSchema = new Schema<JobWithAddress>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  zcode: { type: String, required: true },
  street: { type: String, required: true },
  house: { type: String, required: true },
  local: { type: String },
}, {
  timestamps: true,
});

export const JobModel = model<JobWithAddress>('Job', JobSchema);
