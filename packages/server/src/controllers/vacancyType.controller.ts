import { Response, Router } from 'express';
import asyncHandler from 'express-async-handler';

import { CreateVacancyTypeDto } from '../dto';
import { authMiddleware, validationMiddleware } from '../middleware';
import { VacancyTypeService } from '../services';
import {
  Controller, IdType, UserRequest, VacancyType,
} from '../types';

export class VacancyTypeController implements Controller {
  readonly path = '/vacancy-type';

  readonly router = Router();

  private currencyService: VacancyTypeService = new VacancyTypeService();

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
        validationMiddleware(CreateVacancyTypeDto),
        asyncHandler(this.create),
      )
      .patch(
        `${this.path}/:id`,
        validationMiddleware(CreateVacancyTypeDto, true),
        asyncHandler(this.update),
      );
  };

  private getAll = async (_req: UserRequest, res: Response) => {
    const vacancyType = await this.currencyService.getAll();
    res.json(vacancyType);
  };

  private getById = async (req: UserRequest<IdType>, res: Response<VacancyType>) => {
    const { id } = req.params;
    const vacancyType = await this.currencyService.getById(id);
    res.json(vacancyType);
  };

  private create = async (req: UserRequest, res: Response<VacancyType>) => {
    const body = req.body as VacancyType;
    const vacancyType = await this.currencyService.create(body);
    res.json(vacancyType);
  };

  private update = async (req: UserRequest<IdType, VacancyType>, res: Response<VacancyType>) => {
    const { id } = req.params;
    const { body } = req;
    const vacancyType = await this.currencyService.update(id, body);
    res.json(vacancyType);
  };

  private delete = async (req: UserRequest<IdType>, res: Response<VacancyType>) => {
    const { id } = req.params;
    await this.currencyService.delete(id);
    res.sendStatus(200);
  };
}
