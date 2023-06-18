import { Response } from 'express';
import { CurrencyService } from '../services/currency.service';
import {
  Currency,
  IdType,
  UserRequest,
} from '../types';

export class CurrencyController {
  constructor(
    private readonly currencyService: CurrencyService,
  ) {}

  getAll = async (_req: UserRequest, res: Response): Promise<void> => {
    const currency = await this.currencyService.getAll();
    res.json(currency);
  };

  getById = async (req: UserRequest<IdType>, res: Response): Promise<void> => {
    const { id } = req.params;
    const currency = await this.currencyService.getById(id);
    res.json(currency);
  };

  create = async (req: UserRequest<unknown, Currency>, res: Response<Currency>): Promise<void> => {
    const { body } = req;
    const currency = await this.currencyService.create(body);
    res.json(currency);
  };

  update = async (req: UserRequest<IdType, Currency>, res: Response<Currency>): Promise<void> => {
    const { id } = req.params;
    const currency = req.body;
    const newOne = await this.currencyService.update(id, currency);
    res.json(newOne);
  };

  delete = async (req: UserRequest<IdType>, res: Response): Promise<void> => {
    const { id } = req.params;
    await this.currencyService.delete(id);
    res.sendStatus(200);
  };
}
