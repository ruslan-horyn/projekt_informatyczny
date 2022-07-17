import { model, Schema } from 'mongoose';

import { Currency } from '../types';

export const CurrencySchema = new Schema({
  name: { type: String, required: true },
}, {
  timestamps: true,
});

export const CurrencyModel = model<Currency>('Currency', CurrencySchema);
