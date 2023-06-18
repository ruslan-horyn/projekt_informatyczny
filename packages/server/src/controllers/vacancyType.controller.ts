import { Response } from 'express';
import { VacancyTypeService } from '../services/vacancyType.service';
import {
  IdType, UserRequest, VacancyType,
} from '../types';

export class VacancyTypeController {
  constructor(
    private readonly vacancyTypeService: VacancyTypeService,
  ) {}

  getAll = async (_req: UserRequest, res: Response): Promise<void> => {
    const vacancyType = await this.vacancyTypeService.getAll();
    res.json(vacancyType);
  };

  getById = async (req: UserRequest<IdType>, res: Response<VacancyType>): Promise<void> => {
    const { id } = req.params;
    const vacancyType = await this.vacancyTypeService.getById(id);
    res.json(vacancyType);
  };

  create = async (req: UserRequest, res: Response<VacancyType>): Promise<void> => {
    const body = req.body as VacancyType;
    const vacancyType = await this.vacancyTypeService.create(body);
    res.json(vacancyType);
  };

  update = async (req: UserRequest<IdType, VacancyType>, res: Response<VacancyType>): Promise<void> => {
    const { id } = req.params;
    const { body } = req;
    const vacancyType = await this.vacancyTypeService.update(id, body);
    res.json(vacancyType);
  };

  delete = async (req: UserRequest<IdType>, res: Response<VacancyType>): Promise<void> => {
    const { id } = req.params;
    await this.vacancyTypeService.delete(id);
    res.sendStatus(200);
  };
}
