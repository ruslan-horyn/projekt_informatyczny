import { Response, Router } from 'express';
import asyncHandler from 'express-async-handler';

import { CurrencyDto } from '../dto';
import { authMiddleware, validationMiddleware } from '../middleware';
import { CurrencyService } from '../services';
import {
  Controller,
  Currency,
  IdType,
  UserRequest,
} from '../types';

export class CurrencyController implements Controller {
  readonly path = '/currency';

  readonly router = Router();

  private currencyService: CurrencyService = new CurrencyService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router
      .all(`${this.path}`, authMiddleware)
      .all(`${this.path}/*`, authMiddleware)
      .get(`${this.path}`, asyncHandler(this.getAll))
      .get(`${this.path}/:id`, asyncHandler(this.getById))
      .delete(`${this.path}/:id`, asyncHandler(this.delete))
      .post(
        `${this.path}`,
        validationMiddleware(CurrencyDto),
        asyncHandler(this.create),
      )
      .patch(
        `${this.path}/:id`,
        validationMiddleware(CurrencyDto, true),
        asyncHandler(this.update),
      );
  };

  private getAll = async (_req: UserRequest, res: Response) => {
    const currency = await this.currencyService.getAll();
    res.json(currency);
  };

  private getById = async (req: UserRequest<IdType>, res: Response) => {
    const { id } = req.params;
    const currency = await this.currencyService.getById(id);
    res.json(currency);
  };

  private create = async (req: UserRequest<unknown, Currency>, res: Response<Currency>) => {
    const { body } = req;
    const currency = await this.currencyService.create(body);
    res.json(currency);
  };

  private update = async (req: UserRequest<IdType, Currency>, res: Response<Currency>) => {
    const { id } = req.params;
    const currency = req.body;
    const newOne = await this.currencyService.update(id, currency);
    res.json(newOne);
  };

  private delete = async (req: UserRequest<IdType>, res: Response) => {
    const { id } = req.params;
    await this.currencyService.delete(id);
    res.sendStatus(200);
  };
}
