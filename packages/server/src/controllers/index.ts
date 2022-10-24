import { Controller } from '../types';
import { AuthController } from './auth.controller';
import { CurrencyController } from './currency.controller';
import { EmployeeController } from './employee.controller';
import { JobController } from './job.controller';
import { PostsController } from './post.controller';
import { RoleController } from './role.controller';
import { UserController } from './user.controller';
import { VacancyController } from './vacancy.controller';
import { VacancyTypeController } from './vacancyType.controller';
import { AddressController } from './address.controller';

const controllers: Controller[] = [
  new PostsController(),
  new RoleController(),
  new UserController(),
  new AuthController(),
  new JobController(),
  new EmployeeController(),
  new CurrencyController(),
  new VacancyTypeController(),
  new VacancyController(),
  new AddressController(),
];

export default controllers;
