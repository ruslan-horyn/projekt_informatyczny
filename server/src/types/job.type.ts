import { Address } from './address.type';

export interface Job {
  name: string;
  description: string;
  phone: string;
}

export interface JobWithAddress extends Job, Address {
}
