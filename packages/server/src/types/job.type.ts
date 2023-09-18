import { Address } from './address.type';
import { FilterKeys } from './helpers.type';

export interface Job {
  id: string;
  name: string;
  description: string;
  phone: string;
  address: Address;
}

export type JobPayload = FilterKeys<Job, 'id'> & { address: string[] };
