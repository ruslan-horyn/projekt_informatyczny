import { Model } from 'mongoose';

import {
  VacancyTypeIdIsIncorrectException,
  VacancyTypeIsExistsException,
  VacancyTypeNotFoundException,
} from '../exceptions';
import { VacancyTypeModel } from '../models';
import { VacancyType } from '../types';

export class VacancyTypeService {
  private readonly vacancyTypeModel: Model<VacancyType>;

  constructor() {
    this.vacancyTypeModel = VacancyTypeModel;
  }

  public async getAllVacancyType() {
    return this.vacancyTypeModel.find();
  }

  public async getVacancyTypeById(id: string) {
    if (!id) {
      throw new VacancyTypeIdIsIncorrectException(id);
    }

    const vacancyType = await this.vacancyTypeModel.findById(id);

    if (!vacancyType) {
      throw new VacancyTypeNotFoundException();
    }

    return vacancyType;
  }

  public async createVacancyType(data: VacancyType) {
    const { name } = data;
    const vacancyType = await this.vacancyTypeModel.findOne({ name });

    if (vacancyType) {
      throw new VacancyTypeIsExistsException(name);
    }

    return this.vacancyTypeModel.create({ name });
  }

  public async updateVacancyType(id: string, data: VacancyType) {
    if (!id) {
      throw new VacancyTypeIdIsIncorrectException(id);
    }

    return this.vacancyTypeModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteVacancyType(id: string) {
    if (!id) {
      throw new VacancyTypeIdIsIncorrectException(id);
    }

    const vacancyType = await this.vacancyTypeModel.findByIdAndDelete(id);

    if (!vacancyType) {
      throw new VacancyTypeNotFoundException();
    }

    return vacancyType;
  }
}
