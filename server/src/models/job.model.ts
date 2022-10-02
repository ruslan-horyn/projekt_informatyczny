import { model, Schema } from 'mongoose';

import { Job, TransformType } from '../types';

export const JobSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: Schema.Types.ObjectId, ref: 'Address' },
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

export const JobModel = model<Job>('Job', JobSchema);
