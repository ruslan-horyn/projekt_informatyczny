import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { VacancyController } from '../controllers/vacancy.controller';
import { CreateVacancyDto } from '../dto';
import { authMiddleware, validationMiddleware } from '../middleware';
import { permissionMiddleware } from '../middleware/permission.middleware';
import { CurrencyService } from '../services/currency.service';
import { EmployeeService } from '../services/employee.service';
import { JobService } from '../services/job.service';
import { VacancyService } from '../services/vacancy.service';
import { VacancyTypeService } from '../services/vacancyType.service';

const vacancyRouter = () => {
  const router = Router();
  const path = '/vacancies';

  const vacancyService = new VacancyService();
  const jobService = new JobService();
  const employeeService = new EmployeeService();
  const vacancyTypeService = new VacancyTypeService();
  const currencyService = new CurrencyService();
  const vacancyController = new VacancyController({
    vacancy: vacancyService,
    job: jobService,
    employee: employeeService,
    vacancyType: vacancyTypeService,
    currency: currencyService,
  });

  router
    .all(`${path}`, authMiddleware, permissionMiddleware(['admin']))
    .all(`${path}/:id`, authMiddleware)
    .get(`${path}`, expressAsyncHandler(vacancyController.getAll))
    .get(`${path}/:id`, expressAsyncHandler(vacancyController.getById))
    .delete(`${path}/:id`, expressAsyncHandler(vacancyController.delete))
    .post(
      `${path}`,
      validationMiddleware(CreateVacancyDto),
      expressAsyncHandler(vacancyController.create),
    )
    .patch(
      `${path}/:id`,
      validationMiddleware(CreateVacancyDto, true),
      expressAsyncHandler(vacancyController.update),
    );

  return router;
};

export default vacancyRouter;
