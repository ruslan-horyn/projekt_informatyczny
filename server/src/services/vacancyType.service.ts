import { isValidObjectId, Model } from 'mongoose';

import {
  VacancyTypeIdIsIncorrectException,
  VacancyTypeIsExistsException,
  VacancyTypeNotFoundException,
} from '../exceptions';
import { VacancyTypeModel } from '../models';
import { VacancyType } from '../types';

export class VacancyTypeService {
  private readonly vacancyTypeModel: Model<VacancyType> = VacancyTypeModel;

  async getAll(): Promise<VacancyType[]> {
    return this.vacancyTypeModel.find();
  }

  async getById(id: string): Promise<VacancyType> {
    if (!isValidObjectId(id)) {
      throw new VacancyTypeIdIsIncorrectException(id);
    }

    const vacancyType = await this.vacancyTypeModel.findById(id);

    if (!vacancyType) {
      throw new VacancyTypeNotFoundException();
    }

    return vacancyType;
  }

  async create(data: VacancyType): Promise<VacancyType> {
    const { name } = data;
    const vacancyType = await this.vacancyTypeModel.findOne({ name });

    if (vacancyType) {
      throw new VacancyTypeIsExistsException(name);
    }

    return this.vacancyTypeModel.create({ name });
  }

  async update(id: string, data: VacancyType): Promise<VacancyType> {
    if (!isValidObjectId(id)) {
      throw new VacancyTypeIdIsIncorrectException(id);
    }

    const vacancyType = await this.vacancyTypeModel.findByIdAndUpdate(id, data, { new: true });

    if (!vacancyType) {
      throw new VacancyTypeNotFoundException();
    }

    return vacancyType;
  }

  async delete(id: string): Promise<void> {
    if (!isValidObjectId(id)) {
      throw new VacancyTypeIdIsIncorrectException(id);
    }

    const vacancyType = await this.vacancyTypeModel.findByIdAndDelete(id);

    if (!vacancyType) {
      throw new VacancyTypeNotFoundException();
    }
  }
}
