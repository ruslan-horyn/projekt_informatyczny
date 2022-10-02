import { Response, Router } from 'express';
import asyncHandler from 'express-async-handler';

import { CreateVacancyDto } from '../dto';
import { VacancyCreateErrorException } from '../exceptions';
import { authMiddleware, validationMiddleware } from '../middleware';
import {
  CurrencyService,
  EmployeeService, JobService, VacancyService, VacancyTypeService,
} from '../services';
import {
  Controller, IdType, UserRequest, Vacancy,
} from '../types';

export class VacancyController implements Controller {
  readonly path = '/vacancy';

  readonly router = Router();

  private vacancyService: VacancyService = new VacancyService();

  private jobService: JobService = new JobService();

  private employeeService: EmployeeService = new EmployeeService();

  private vacancyTypeService: VacancyTypeService = new VacancyTypeService();

  private currencyService: CurrencyService = new CurrencyService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router
      .all(`${this.path}`, authMiddleware)
      .all(`${this.path}/:id`, authMiddleware)
      .get(`${this.path}`, asyncHandler(this.getAll))
      .get(`${this.path}/:id`, asyncHandler(this.getById))
      .delete(`${this.path}/:id`, asyncHandler(this.delete))
      .post(
        `${this.path}`,
        validationMiddleware(CreateVacancyDto),
        asyncHandler(this.create),
      )
      .patch(
        `${this.path}/:id`,
        validationMiddleware(CreateVacancyDto, true),
        asyncHandler(this.update),
      );
  };

  private getAll = async (_req: UserRequest, res: Response<Vacancy[]>) => {
    const vacancy = await this.vacancyService.getAll();
    res.json(vacancy);
  };

  private getById = async (req: UserRequest<IdType>, res: Response<Vacancy>) => {
    const { id } = req.params;
    const vacancy = await this.vacancyService.getById(id);
    res.json(vacancy);
  };

  private create = async (req: UserRequest<IdType, Vacancy>, res: Response<Vacancy>) => {
    const { body } = req;

    await Promise.all([
      this.jobService.getById(body.job),
      this.employeeService.getById(body.employee),
      this.vacancyTypeService.getById(body.type),
      this.currencyService.getById(body.currency),
    ])
      .catch(() => {
        throw new VacancyCreateErrorException();
      });

    const vacancy = await this.vacancyService.create(body);
    res.json(vacancy);
  };

  private update = async (req: UserRequest<IdType, Vacancy>, res: Response<Vacancy>) => {
    const { id } = req.params;
    const { body } = req;
    const vacancy = await this.vacancyService.update(id, body);
    res.json(vacancy);
  };

  private delete = async (req: UserRequest<IdType>, res: Response) => {
    const { id } = req.params;
    await this.vacancyService.delete(id);
    res.sendStatus(200);
  };
}
