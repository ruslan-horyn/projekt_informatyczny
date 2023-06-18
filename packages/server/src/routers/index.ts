import { Router } from 'express';
import addressRouter from './address.router';
import authRouter from './auth.router';
import currencyRouter from './currency.router';
import employeeRouter from './employee.router';
import jobRouter from './job.router';
import roleRouter from './role.router';
import userRouter from './user.router';
import vacancyRouter from './vacancy.router';
import vacancyTypeRouter from './vacancyType.router';

const routers: Router[] = [
  addressRouter(),
  authRouter(),
  currencyRouter(),
  employeeRouter(),
  jobRouter(),
  roleRouter(),
  userRouter(),
  vacancyRouter(),
  vacancyTypeRouter(),
];

export default routers;
