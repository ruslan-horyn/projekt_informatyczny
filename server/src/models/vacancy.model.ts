import { model, Schema, Types } from 'mongoose';

import { Vacancy } from '../types';

export const VacancySchema = new Schema({
  name: { type: String, required: true },
  start: { type: String, required: true },
  end: { type: String },
  salary: { type: String, required: true },
  type: { type: Types.ObjectId, ref: 'VacancyType', required: true },
  job: { type: Types.ObjectId, ref: 'Job', required: true },
  employee: { type: Types.ObjectId, ref: 'Employee', required: true },
  currency: { type: Types.ObjectId, ref: 'Currency', required: true },
}, {
  timestamps: true,
});

export const VacancyModel = model<Vacancy>('Vacancy', VacancySchema);
