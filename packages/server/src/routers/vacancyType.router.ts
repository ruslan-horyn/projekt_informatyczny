import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { VacancyTypeController } from '../controllers/vacancyType.controller';
import { CreateVacancyTypeDto } from '../dto';
import { authMiddleware, validationMiddleware } from '../middleware';
import { permissionMiddleware } from '../middleware/permission.middleware';
import { VacancyTypeService } from '../services/vacancyType.service';

const vacancyTypeRouter = () => {
  const router = Router();
  const path = '/vacancy-types';

  const vacancyTypeService = new VacancyTypeService();
  const vacancyTypeController = new VacancyTypeController(vacancyTypeService);

  router
    .all(`${path}`, authMiddleware, permissionMiddleware(['admin']))
    .all(`${path}/:id`, authMiddleware)
    .get(`${path}`, expressAsyncHandler(vacancyTypeController.getAll))
    .get(`${path}/:id`, expressAsyncHandler(vacancyTypeController.getById))
    .delete(`${path}/:id`, expressAsyncHandler(vacancyTypeController.delete))
    .post(
      `${path}`,
      validationMiddleware(CreateVacancyTypeDto),
      expressAsyncHandler(vacancyTypeController.create),
    )
    .patch(
      `${path}/:id`,
      validationMiddleware(CreateVacancyTypeDto, true),
      expressAsyncHandler(vacancyTypeController.update),
    );

  return router;
};

export default vacancyTypeRouter;
