/* eslint-disable no-param-reassign */
import { TransformType } from '../../types';

export const transformDoc = (_doc: unknown, ret: TransformType) => {
  ret.id = ret._id?.toString();
  delete ret._id;
  delete ret.__v;
  delete ret.createdAt;
  delete ret.updatedAt;
};
