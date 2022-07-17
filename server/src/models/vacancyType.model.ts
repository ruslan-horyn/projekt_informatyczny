import { model, Schema } from 'mongoose';

import { VacancyType } from '../types';

export const VacancyTypeSchema = new Schema({
  name: { type: String, required: true },
}, {
  timestamps: true,
});

export const VacancyTypeModel = model<VacancyType>('VacancyType', VacancyTypeSchema);
