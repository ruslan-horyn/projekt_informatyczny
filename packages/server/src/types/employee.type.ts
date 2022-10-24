import { Address } from './address.type';

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  passportSerialNumber: string;
  visaStart: string;
  visaEnd: string;
}

export interface EmployeeWithStartAddress extends Address {
  start: string;
  end: string;
}
