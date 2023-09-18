import { Address } from './address.type';

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  documentIdNumber: string;
  visaStart: string;
  visaEnd: string;
  address: string;
}

export interface EmployeeWithStartAddress extends Address {
  start: string;
  end: string;
}
