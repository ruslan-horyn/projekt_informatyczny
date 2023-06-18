import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { CurrencyController } from '../controllers/currency.controller';
import { CurrencyDto } from '../dto';
import { authMiddleware, validationMiddleware } from '../middleware';
import { permissionMiddleware } from '../middleware/permission.middleware';
import { CurrencyService } from '../services/currency.service';

const currencyRouter = () => {
  const router = Router();
  const path = '/currency';

  const currencyService = new CurrencyService();
  const currencyController = new CurrencyController(currencyService);

  router
    .all(`${path}`, authMiddleware, permissionMiddleware(['admin']))
    .all(`${path}/*`, authMiddleware, permissionMiddleware(['admin']))
    .get(`${path}`, expressAsyncHandler(currencyController.getAll))
    .get(`${path}/:id`, expressAsyncHandler(currencyController.getById))
    .delete(`${path}/:id`, expressAsyncHandler(currencyController.delete))
    .post(
      `${path}`,
      validationMiddleware(CurrencyDto),
      expressAsyncHandler(currencyController.create),
    )
    .patch(
      `${path}/:id`,
      validationMiddleware(CurrencyDto, true),
      expressAsyncHandler(currencyController.update),
    );

  return router;
};

export default currencyRouter;
