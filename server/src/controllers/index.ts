import ControllerI from '../types/controller.type';
import AuthController from './auth.controller';
import JobController from './job.controller';
import PostsController from './post.controller';
import RoleController from './role.controller';
import UserController from './user.controller';

const controllers: ControllerI[] = [
  new PostsController(),
  new RoleController(),
  new UserController(),
  new AuthController(),
  new JobController(),
];

export default controllers;
