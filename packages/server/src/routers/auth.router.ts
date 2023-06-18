import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { AuthController } from '../controllers/auth.controller';
import { LoginDto } from '../dto';
import { validationMiddleware } from '../middleware';
import { UserService } from '../services/user.service';

const authRouter = () => {
  const router = Router();
  const path = '/auth';

  const userService = new UserService();
  const authController = new AuthController(userService);

  router
    .post(
      `${path}/login`,
      validationMiddleware(LoginDto),
      expressAsyncHandler(authController.login),
    )
    .post(`${path}/refresh`, expressAsyncHandler(authController.refresh))
    .post(`${path}/logout`, expressAsyncHandler(authController.logout));

  return router;
};

export default authRouter;
