import { model, Schema } from 'mongoose';

import { TransformType, VacancyType } from '../types';
import { transformDoc } from './helper/transaform';

export const VacancyTypeSchema = new Schema({
  name: { type: String, required: true },
}, {
  timestamps: true,
  toJSON: {
    transform(_doc, ret: TransformType) {
      transformDoc(_doc, ret);
    },
  },
});

export const VacancyTypeModel = model<VacancyType>('VacancyType', VacancyTypeSchema);
