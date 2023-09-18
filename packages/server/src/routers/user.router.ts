import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { UserController } from '../controllers/user.controller';
import { UserDto } from '../dto';
import { authMiddleware, validationMiddleware } from '../middleware';
import { permissionMiddleware } from '../middleware/permission.middleware';
import { UserService } from '../services/user.service';

const userRouter = () => {
  const router = Router();
  const path = '/users';

  const userService = new UserService();
  const userController = new UserController(userService);

  router
    .all(`${path}*`, authMiddleware, permissionMiddleware())
    .get(`${path}`, authMiddleware, expressAsyncHandler(userController.getAll))
    .get(`${path}/:id`, expressAsyncHandler(userController.getById))
    .delete(`${path}/:id`, expressAsyncHandler(userController.delete))
    .post(
      path,
      validationMiddleware(UserDto),
      expressAsyncHandler(userController.create),
    )
    .patch(
      `${path}/:id`,
      validationMiddleware(UserDto, true),
      expressAsyncHandler(userController.update),
    );

  return router;
};

export default userRouter;
