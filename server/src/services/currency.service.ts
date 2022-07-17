import { Model } from 'mongoose';

import {
  CurrencyIdIsIncorrectException,
  CurrencyIsExistsException,
  CurrencyNotFoundException,
} from '../exceptions/Currency.exceptions';
import { CurrencyModel } from '../models';
import { Currency } from '../types';

export class CurrencyService {
  private readonly currencyModel: Model<Currency>;

  constructor() {
    this.currencyModel = CurrencyModel;
  }

  public async getAllCurrency() {
    return this.currencyModel.find();
  }

  public async getCurrencyById(id: string) {
    if (!id) {
      throw new CurrencyIdIsIncorrectException(id);
    }

    const currency = await this.currencyModel.findById(id);

    if (!currency) {
      throw new CurrencyNotFoundException();
    }

    return currency;
  }

  public async createCurrency(data: Currency) {
    const { name } = data;
    const currency = await this.currencyModel.findOne({ name });

    if (currency) {
      throw new CurrencyIsExistsException(name);
    }

    return this.currencyModel.create({ name });
  }

  public async updateCurrency(id: string, data: Currency) {
    if (!id) {
      throw new CurrencyIdIsIncorrectException(id);
    }

    return this.currencyModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteCurrency(id: string) {
    if (!id) {
      throw new CurrencyIdIsIncorrectException(id);
    }

    const currency = await this.currencyModel.findByIdAndDelete(id);

    if (!currency) {
      throw new CurrencyNotFoundException();
    }

    return currency;
  }
}
