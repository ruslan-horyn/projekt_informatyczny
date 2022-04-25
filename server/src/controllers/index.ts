import ControllerI from '../types/controller.type';
import AuthController from './auth.controller';
import PostsController from './post.controller';
import RoleController from './role.controller';
import UserController from './user.controller';

const controllers: ControllerI[] = [
  new PostsController(),
  new RoleController(),
  new UserController(),
  new AuthController(),
];

export default controllers;
