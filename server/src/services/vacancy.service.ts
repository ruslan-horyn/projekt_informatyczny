import { Model } from 'mongoose';

import {
  VacancyIdIsIncorrectException,
  VacancyNotFoundException,
} from '../exceptions';
import { VacancyModel } from '../models';
import { Vacancy } from '../types';

export class VacancyService {
  private readonly vacancyModel: Model<Vacancy>;

  constructor() {
    this.vacancyModel = VacancyModel;
  }

  public async getAllVacancy() {
    return this.vacancyModel.find()
      .populate(['job', 'employee', 'type', 'currency']);
  }

  public async getVacancyById(id: string) {
    if (!id) {
      throw new VacancyIdIsIncorrectException(id);
    }

    const vacancy = await this.vacancyModel.findById<Vacancy>(id)
      .populate(['job', 'employee', 'type', 'currency']);

    if (!vacancy) {
      throw new VacancyNotFoundException();
    }

    return vacancy;
  }

  public async createVacancy(data: Vacancy) {
    // const { name,  } = data;
    // const vacancy = await this.vacancyModel.findOne({ name });

    // if (vacancy) {
    //   throw new VacancyIsExistsException(name);
    // }

    return this.vacancyModel.create<Vacancy>(data);
  }

  public async updateVacancy(id: string, data: Vacancy) {
    if (!id) {
      throw new VacancyIdIsIncorrectException(id);
    }

    return this.vacancyModel.findByIdAndUpdate<Vacancy>(id, data, { new: true });
  }

  async deleteVacancy(id: string) {
    if (!id) {
      throw new VacancyIdIsIncorrectException(id);
    }

    const vacancy = await this.vacancyModel.findByIdAndDelete<Vacancy>(id);

    if (!vacancy) {
      throw new VacancyNotFoundException();
    }

    return vacancy;
  }
}
