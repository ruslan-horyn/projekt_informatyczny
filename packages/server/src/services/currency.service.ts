import { isValidObjectId, Model } from 'mongoose';

import {
  CurrencyIdIsIncorrectException, CurrencyNotFoundException,
} from '../exceptions/Currency.exceptions';
import { CurrencyModel } from '../models';
import { Currency } from '../types';

export class CurrencyService {
  private readonly currencyModel: Model<Currency> = CurrencyModel;

  async getAll(): Promise<Currency[]> {
    return this.currencyModel.find<Currency>();
  }

  async getById(id: string): Promise<Currency> {
    if (!isValidObjectId(id)) {
      throw new CurrencyIdIsIncorrectException(id);
    }

    const currency = await this.currencyModel.findById<Currency>(id);

    if (!currency) {
      throw new CurrencyNotFoundException();
    }

    return currency;
  }
}
