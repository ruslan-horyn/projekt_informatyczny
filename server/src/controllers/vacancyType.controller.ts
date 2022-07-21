import { Response, Router } from 'express';
import asyncHandler from 'express-async-handler';

import { CreateVacancyTypeDto } from '../dto';
import { authMiddleware, validationMiddleware } from '../middleware';
import { VacancyTypeService } from '../services';
import { Controller, RequestWithUser, VacancyType } from '../types';

export class VacancyTypeController implements Controller {
  public readonly path = '/vacancy-type';

  public readonly router = Router();

  private currencyService: VacancyTypeService = new VacancyTypeService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router
      .all(`${this.path}`, authMiddleware)
      .all(`${this.path}/:id`, authMiddleware)
      .get(`${this.path}`, asyncHandler(this.getAllVacancyType))
      .get(`${this.path}/:id`, asyncHandler(this.getVacancyTypeById))
      .delete(`${this.path}/:id`, asyncHandler(this.deleteCurrency))
      .post(
        `${this.path}`,
        validationMiddleware(CreateVacancyTypeDto),
        asyncHandler(this.createVacancyType),
      )
      .patch(
        `${this.path}/:id`,
        validationMiddleware(CreateVacancyTypeDto, true),
        asyncHandler(this.updateCurrency),
      );
  };

  private getAllVacancyType = async (_req: RequestWithUser, res: Response) => {
    const vacancyType = await this.currencyService.getAllVacancyType();
    res.json(vacancyType);
  };

  private getVacancyTypeById = async (req: RequestWithUser, res: Response) => {
    const { id } = req.params;
    const vacancyType = await this.currencyService.getVacancyTypeById(id);
    res.json(vacancyType);
  };

  private createVacancyType = async (req: RequestWithUser, res: Response) => {
    const body = req.body as VacancyType;
    const vacancyType = await this.currencyService.createVacancyType(body);
    res.json(vacancyType);
  };

  private updateCurrency = async (req: RequestWithUser, res: Response) => {
    const { id } = req.params;
    const body = req.body as VacancyType;
    const vacancyType = await this.currencyService.updateVacancyType(id, body);
    res.json(vacancyType);
  };

  private deleteCurrency = async (req: RequestWithUser, res: Response) => {
    const { id } = req.params;
    const vacancyType = await this.currencyService.deleteVacancyType(id);
    res.json(vacancyType);
  };
}
