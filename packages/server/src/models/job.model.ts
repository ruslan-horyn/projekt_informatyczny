import { model, Schema } from 'mongoose';

import { Job, TransformType } from '../types';
import { transformDoc } from './helper/transaform';

export const JobSchema = new Schema<Job>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  phone: { type: String, required: true },
  address: [{ type: Schema.Types.ObjectId, ref: 'Address' }],
}, {
  timestamps: true,
  toJSON: {
    transform(_doc, ret: TransformType) {
      transformDoc(_doc, ret);
    },
  },
});

export const JobModel = model<Job>('Job', JobSchema);
