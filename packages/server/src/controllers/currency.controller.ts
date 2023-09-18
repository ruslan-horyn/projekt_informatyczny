import { Response } from 'express';
import { CurrencyService } from '../services/currency.service';
import {
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
}
