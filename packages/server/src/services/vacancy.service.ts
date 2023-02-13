import { isValidObjectId, Model } from 'mongoose';

import {
  VacancyIdIsIncorrectException,
  VacancyNotFoundException,
} from '../exceptions';
import { VacancyModel } from '../models';
import { Vacancy } from '../types';

export class VacancyService {
  private readonly vacancyModel: Model<Vacancy> = VacancyModel;

  async getAll() {
    return this.vacancyModel.find()
      .populate(['jobId', 'employeeId', 'typeId', 'currencyId']);
  }

  async getById(id: string): Promise<Vacancy> {
    if (!isValidObjectId(id)) {
      throw new VacancyIdIsIncorrectException(id);
    }

    const vacancy = await this.vacancyModel.findById<Vacancy>(id)
      .populate(['jobId', 'employeeId', 'typeId', 'currencyId']);

    if (!vacancy) {
      throw new VacancyNotFoundException();
    }

    return vacancy;
  }

  async create(data: Vacancy): Promise<Vacancy> {
    return (await this.vacancyModel.create(data))
      .populate(['jobId', 'employeeId', 'typeId', 'currencyId']);
  }

  async update(id: string, data: Vacancy): Promise<Vacancy> {
    if (!isValidObjectId(id)) {
      throw new VacancyIdIsIncorrectException(id);
    }

    const vacancy = await this.vacancyModel
      .findByIdAndUpdate<Vacancy>(id, data, { new: true })
      .populate(['jobId', 'employeeId', 'typeId', 'currencyId']);

    if (!vacancy) {
      throw new VacancyNotFoundException();
    }

    return vacancy;
  }

  async delete(id: string): Promise<void> {
    if (!isValidObjectId(id)) {
      throw new VacancyIdIsIncorrectException(id);
    }

    const vacancy = await this.vacancyModel.findByIdAndDelete<Vacancy>(id);

    if (!vacancy) {
      throw new VacancyNotFoundException();
    }
  }
}