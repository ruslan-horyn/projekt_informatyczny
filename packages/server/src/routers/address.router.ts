import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { AddressController } from '../controllers/address.controller';
import { AddressDto } from '../dto';
import { authMiddleware, validationMiddleware } from '../middleware';
import { permissionMiddleware } from '../middleware/permission.middleware';
import { AddressService } from '../services/address.service';

const addressRouter = () => {
  const router = Router();
  const path = '/address';

  const addressService = new AddressService();
  const addressController = new AddressController(addressService);

  router
    .all(`${path}`, authMiddleware, permissionMiddleware(['admin']))
    .all(`${path}/*`, authMiddleware, permissionMiddleware(['admin']))
    .get(`${path}`, expressAsyncHandler(addressController.getAll))
    .get(`${path}/:id`, expressAsyncHandler(addressController.getById))
    .delete(`${path}/:id`, expressAsyncHandler(addressController.delete))
    .post(
      `${path}`,
      validationMiddleware(AddressDto),
      expressAsyncHandler(addressController.create),
    )
    .patch(
      `${path}/:id`,
      validationMiddleware(AddressDto, true),
      expressAsyncHandler(addressController.update),
    );

  return router;
};

export default addressRouter;
