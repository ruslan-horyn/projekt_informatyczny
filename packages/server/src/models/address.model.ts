import { model, Schema } from 'mongoose';

import { Address, TransformType } from '../types';

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
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
  id: true,
});

export const AddressModel = model<Address>('Address', AddressSchema);
