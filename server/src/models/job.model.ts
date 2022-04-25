import { model, Schema } from 'mongoose';
import { JobI } from '../types/job.type';

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

const JobModel = model<JobI>('Job', JobSchema);
export default JobModel;
