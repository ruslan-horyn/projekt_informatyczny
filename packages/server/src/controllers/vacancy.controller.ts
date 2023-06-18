import { Response } from 'express';
import { CurrencyService } from '../services/currency.service';
import { EmployeeService } from '../services/employee.service';
import { JobService } from '../services/job.service';
import { VacancyService } from '../services/vacancy.service';
import { VacancyTypeService } from '../services/vacancyType.service';
import {
  IdType, UserRequest, Vacancy,
} from '../types';

interface VacancyControllerServices {
  vacancy: VacancyService,
  job: JobService,
  employee: EmployeeService,
  vacancyType: VacancyTypeService,
  currency: CurrencyService,
}
export class VacancyController {
  constructor(
    private readonly _services: VacancyControllerServices,
  ) {}

  getAll = async (_req: UserRequest, res: Response<Vacancy[]>): Promise<void> => {
    const vacancy = await this._services.vacancy.getAll();
    res.json(vacancy);
  };

  getById = async (req: UserRequest<IdType>, res: Response<Vacancy>): Promise<void> => {
    const { id } = req.params;
    const vacancy = await this._services.vacancy.getById(id);
    res.json(vacancy);
  };

  create = async (req: UserRequest<IdType, Vacancy>, res: Response<Vacancy>): Promise<void> => {
    const { body } = req;

    await Promise.all([
      this._services.job.getById(body.jobId),
      this._services.employee.getById(body.employeeId),
      this._services.vacancyType.getById(body.typeId),
      this._services.currency.getById(body.currencyId),
    ]);

    const vacancy = await this._services.vacancy.create(body);
    res.json(vacancy);
  };

  update = async (req: UserRequest<IdType, Vacancy>, res: Response<Vacancy>): Promise<void> => {
    const { id } = req.params;
    const { body } = req;
    const vacancy = await this._services.vacancy.update(id, body);
    res.json(vacancy);
  };

  delete = async (req: UserRequest<IdType>, res: Response): Promise<void> => {
    const { id } = req.params;
    await this._services.vacancy.delete(id);
    res.sendStatus(200);
  };
}
