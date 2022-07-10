import { Controller } from '../types';
import { AuthController } from './auth.controller';
import { EmployeeController } from './employee.controller';
import { JobController } from './job.controller';
import { PostsController } from './post.controller';
import { RoleController } from './role.controller';
import { UserController } from './user.controller';

const controllers: Controller[] = [
  new PostsController(),
  new RoleController(),
  new UserController(),
  new AuthController(),
  new JobController(),
  new EmployeeController(),
];

export default controllers;
