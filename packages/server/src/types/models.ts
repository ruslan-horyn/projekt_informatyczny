import { ObjectId } from 'mongoose';

export type TransformType = {
  id?: string;
  _id?: ObjectId;
  __v?: string;
  createdAt?: string;
  updatedAt?: string;
};
