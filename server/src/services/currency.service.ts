import { isValidObjectId, Model } from 'mongoose';

import {
  CurrencyIdIsIncorrectException,
  CurrencyIsExistsException,
  CurrencyNotFoundException,
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

  async create(data: Currency): Promise<Currency> {
    const { name } = data;
    const existsCurrency = await this.currencyModel.findOne<Currency>({ name });

    if (existsCurrency) {
      throw new CurrencyIsExistsException(name);
    }

    return this.currencyModel.create({ name });
  }

  async update(id: string, data: Currency): Promise<Currency> {
    if (!isValidObjectId(id)) {
      throw new CurrencyIdIsIncorrectException(id);
    }

    const currency = await this.currencyModel.findByIdAndUpdate<Currency>(id, data, { new: true });

    if (!currency) {
      throw new CurrencyNotFoundException();
    }

    return currency;
  }

  async delete(id: string): Promise<void> {
    if (!isValidObjectId(id)) {
      throw new CurrencyIdIsIncorrectException(id);
    }

    const currency = await this.currencyModel.findByIdAndDelete<Currency>(id);

    if (!currency) {
      throw new CurrencyNotFoundException();
    }
  }
}
