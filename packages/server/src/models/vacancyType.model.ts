import { model, Schema } from 'mongoose';

import { TransformType, VacancyType } from '../types';

export const VacancyTypeSchema = new Schema({
  name: { type: String, required: true },
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

export const VacancyTypeModel = model<VacancyType>('VacancyType', VacancyTypeSchema);
