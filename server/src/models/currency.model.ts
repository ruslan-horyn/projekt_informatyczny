import { model, Schema } from 'mongoose';

import { Currency, TransformType } from '../types';

export const CurrencySchema = new Schema({
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

export const CurrencyModel = model<Currency>('Currency', CurrencySchema);
