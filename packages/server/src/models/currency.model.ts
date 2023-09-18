import { model, Schema } from 'mongoose';

import { Currency, TransformType } from '../types';
import { transformDoc } from './helper/transaform';

export const CurrencySchema = new Schema({
  name: { type: String, required: true },
}, {
  timestamps: true,
  toJSON: {
    transform(_doc, ret: TransformType) {
      transformDoc(_doc, ret);
    },
  },
});

export const CurrencyModel = model<Currency>('Currency', CurrencySchema);
