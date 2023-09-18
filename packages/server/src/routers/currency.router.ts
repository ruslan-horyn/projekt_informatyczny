import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { CurrencyController } from '../controllers/currency.controller';
import { authMiddleware } from '../middleware';
import { permissionMiddleware } from '../middleware/permission.middleware';
import { CurrencyService } from '../services/currency.service';

const currencyRouter = () => {
  const router = Router();
  const path = '/currencies';

  const currencyService = new CurrencyService();
  const currencyController = new CurrencyController(currencyService);

  router
    .all(`${path}`, authMiddleware, permissionMiddleware(['admin']))
    .all(`${path}/*`, authMiddleware, permissionMiddleware(['admin']))
    .get(`${path}`, expressAsyncHandler(currencyController.getAll))
    .get(`${path}/:id`, expressAsyncHandler(currencyController.getById));

  return router;
};

export default currencyRouter;
