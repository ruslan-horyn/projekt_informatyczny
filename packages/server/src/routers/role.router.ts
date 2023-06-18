import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { RoleController } from '../controllers/role.controller';
import { RoleDto } from '../dto';
import { authMiddleware, validationMiddleware } from '../middleware';
import { permissionMiddleware } from '../middleware/permission.middleware';
import { RoleService } from '../services/role.service';

const roleRouter = () => {
  const router = Router();
  const path = '/role';

  const roleService = new RoleService();
  const roleController = new RoleController(roleService);

  router
    .all(`${path}`, authMiddleware, permissionMiddleware())
    .all(`${path}/*`, authMiddleware, permissionMiddleware())
    .get(`${path}`, expressAsyncHandler(roleController.getAll))
    .get(`${path}/:id`, expressAsyncHandler(roleController.getById))
    .delete(`${path}/:id`, expressAsyncHandler(roleController.delete))
    .post(
      path,
      validationMiddleware(RoleDto),
      expressAsyncHandler(roleController.create),
    );

  return router;
};

export default roleRouter;
