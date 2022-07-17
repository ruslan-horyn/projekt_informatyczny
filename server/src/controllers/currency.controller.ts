import { Response, Router } from 'express';
import asyncHandler from 'express-async-handler';

import { CreateCurrencyDto } from '../dto';
import { authMiddleware, validationMiddleware } from '../middleware';
import { CurrencyService } from '../services/currency.service';
import { Controller, Currency, RequestWithUser } from '../types';

export class CurrencyController implements Controller {
  public readonly path = '/currency';

  public readonly router = Router();

  private currencyService: CurrencyService = new CurrencyService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router
      .get(`${this.path}`, authMiddleware, asyncHandler(this.getAllCurrency))
      .get(`${this.path}/:id`, asyncHandler(this.getCurrencyById))
      .delete(`${this.path}/:id`, asyncHandler(this.deleteCurrency))
      .post(
        `${this.path}`,
        validationMiddleware(CreateCurrencyDto),
        asyncHandler(this.createCurrency),
      )
      .patch(
        `${this.path}/:id`,
        validationMiddleware(CreateCurrencyDto, true),
        asyncHandler(this.updateCurrency),
      );
  };

  private getAllCurrency = async (_req: RequestWithUser, res: Response) => {
    const currency = await this.currencyService.getAllCurrency();
    res.json(currency);
  };

  private getCurrencyById = async (req: RequestWithUser, res: Response) => {
    const { id } = req.params;
    const currency = await this.currencyService.getCurrencyById(id);
    res.json(currency);
  };

  private createCurrency = async (req: RequestWithUser, res: Response) => {
    const body = req.body as Currency;
    const currency = await this.currencyService.createCurrency(body);
    res.json(currency);
  };

  private updateCurrency = async (req: RequestWithUser, res: Response) => {
    const { id } = req.params;
    const currency = req.body as Currency;
    const jobNew = await this.currencyService.updateCurrency(id, currency);
    res.json(jobNew);
  };

  private deleteCurrency = async (req: RequestWithUser, res: Response) => {
    const { id } = req.params;
    const currency = await this.currencyService.deleteCurrency(id);
    res.json(currency);
  };
}
