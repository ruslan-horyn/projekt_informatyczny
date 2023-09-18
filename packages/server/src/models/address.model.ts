import { model, Schema } from 'mongoose';

import { Address, TransformType } from '../types';
import { transformDoc } from './helper/transaform';

export const AddressSchema = new Schema<Address>({
  country: { type: String, required: true },
  district: { type: String },
  region: { type: String },
  city: { type: String, required: true },
  street: { type: String, required: true },
  postalCode: { type: String, required: true },
  house: { type: String, required: true },
  local: { type: String },
}, {
  timestamps: true,
  toJSON: {
    transform(_doc, ret: TransformType) {
      transformDoc(_doc, ret);
    },
  },
});

export const AddressModel = model<Address>('Address', AddressSchema);
