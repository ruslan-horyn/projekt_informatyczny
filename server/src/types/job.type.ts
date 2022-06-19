import { AddressI } from './address.type';

export interface JobI extends AddressI {
  name: string;
  description: string;
  phone: string;
}
