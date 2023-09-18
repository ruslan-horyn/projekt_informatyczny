import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { RoleController } from '../controllers/role.controller';
import { authMiddleware } from '../middleware';
import { permissionMiddleware } from '../middleware/permission.middleware';
import { RoleService } from '../services/role.service';

const roleRouter = () => {
  const router = Router();
  const path = '/roles';

  const roleService = new RoleService();
  const roleController = new RoleController(roleService);

  router
    .all(`${path}`, authMiddleware, permissionMiddleware(['admin']))
    .get(`${path}`, expressAsyncHandler(roleController.getAll))
    .get(`${path}/:id`, expressAsyncHandler(roleController.getById));

  return router;
};

export default roleRouter;
