import { isValidObjectId, Model } from 'mongoose';

import {
  VacancyIdIsIncorrectException,
  VacancyNotFoundException,
} from '../exceptions';
import { VacancyModel } from '../models';
import { Vacancy, VacancyPayload } from '../types';

export class VacancyService {
  private readonly vacancyModel: Model<Vacancy> = VacancyModel;

  async getAll() {
    return this.vacancyModel.find();
  }

  async getById(id: string): Promise<Vacancy> {
    if (!isValidObjectId(id)) {
      throw new VacancyIdIsIncorrectException(id);
    }

    const vacancy = await this.vacancyModel.findById<Vacancy>(id);

    if (!vacancy) {
      throw new VacancyNotFoundException();
    }

    return vacancy;
  }

  async create(data: VacancyPayload): Promise<Vacancy> {
    return this.vacancyModel.create(data);
  }

  async update(id: string, data: VacancyPayload): Promise<Vacancy> {
    if (!isValidObjectId(id)) {
      throw new VacancyIdIsIncorrectException(id);
    }

    const vacancy = await this.vacancyModel
      .findByIdAndUpdate<Vacancy>(id, data, { new: true });

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
