import { Response, Router } from 'express';
import asyncHandler from 'express-async-handler';

import { CreateVacancyDto } from '../dto';
import { VacancyCreateErrorException } from '../exceptions';
import { authMiddleware, validationMiddleware } from '../middleware';
import {
  CurrencyService,
  EmployeeService, JobService, VacancyService, VacancyTypeService,
} from '../services';
import { Controller, RequestWithUser, Vacancy } from '../types';

export class VacancyController implements Controller {
  public readonly path = '/vacancy';

  public readonly router = Router();

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
      .get(`${this.path}`, asyncHandler(this.getAllVacancy))
      .get(`${this.path}/:id`, asyncHandler(this.getVacancyById))
      .delete(`${this.path}/:id`, asyncHandler(this.deleteVacancy))
      .post(
        `${this.path}`,
        validationMiddleware(CreateVacancyDto),
        asyncHandler(this.createVacancy),
      )
      .patch(
        `${this.path}/:id`,
        validationMiddleware(CreateVacancyDto, true),
        asyncHandler(this.updateVacancy),
      );
  };

  private getAllVacancy = async (_req: RequestWithUser, res: Response) => {
    const vacancy = await this.vacancyService.getAllVacancy();
    res.json(vacancy);
  };

  private getVacancyById = async (req: RequestWithUser, res: Response) => {
    const { id } = req.params;
    const vacancy = await this.vacancyService.getVacancyById(id);
    res.json(vacancy);
  };

  private createVacancy = async (req: RequestWithUser, res: Response) => {
    const body = req.body as Vacancy;
    const {
      currency, type, job, employee,
    } = body;

    const [
      jobSearch,
      employeeSearch,
      vacancyTypeSearch,
      currencySearch,
    ] = await Promise.all([
      this.jobService.getJobById(job),
      this.employeeService.getEmployeeById(employee),
      this.vacancyTypeService.getVacancyTypeById(type),
      this.currencyService.getCurrencyById(currency),
    ]);

    console.log({
      jobSearch,
      employeeSearch,
      vacancyTypeSearch,
      currencySearch,
    });

    if (jobSearch
      && employeeSearch
      && vacancyTypeSearch
      && currencySearch) {
      const vacancy = await this.vacancyService.createVacancy(body);
      res.json(vacancy);
    } else {
      throw new VacancyCreateErrorException();
    }

    const vacancy = await this.vacancyService.createVacancy(body);
    res.json(vacancy);
  };

  private updateVacancy = async (req: RequestWithUser, res: Response) => {
    const { id } = req.params;
    const body = req.body as Vacancy;
    const vacancy = await this.vacancyService.updateVacancy(id, body);
    res.json(vacancy);
  };

  private deleteVacancy = async (req: RequestWithUser, res: Response) => {
    const { id } = req.params;
    const vacancy = await this.vacancyService.deleteVacancy(id);
    res.json(vacancy);
  };
}
