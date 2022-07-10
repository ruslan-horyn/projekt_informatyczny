import { Types } from 'mongoose';

import { Address } from './address.type';

export interface Employee {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  passportSerialNumber: string;
  visaStart: string;
  visaEnd: string;
}

export interface EmployeeAddress extends Address {
  start: string;
  end: string;
  idEmployee: Types.ObjectId;
}
