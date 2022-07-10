import { model, Schema } from 'mongoose';

import { Job } from '../types';

export const JobSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  zcode: { type: String, required: true },
  street: { type: String, required: true },
  house: { type: String, required: true },
  local: { type: String, required: true },
}, {
  timestamps: true,
});

export const JobModel = model<Job>('Job', JobSchema);
