import { isValidObjectId, Model } from 'mongoose';

import {
  JobIdNotFindException,
  JobNotFind,
} from '../exceptions';
import { JobModel } from '../models';
import { Job } from '../types';

export class JobService {
  private readonly jobModel: Model<Job> = JobModel;

  async getAll(): Promise<Job[]> {
    return this.jobModel.find()
      .populate('address');
  }

  async getById(id: string): Promise<Job> {
    if (!isValidObjectId(id)) {
      throw new JobIdNotFindException(id);
    }

    const job = await this.jobModel.findById(id)
      .populate('address');

    if (!job) {
      throw new JobNotFind();
    }

    return job;
  }

  async create(job: Job, idAddress: string): Promise<Job> {
    return (await this.jobModel.create({ ...job, address: idAddress })).populate('address');
  }

  async delete(id: string): Promise<void> {
    if (!isValidObjectId(id)) {
      throw new JobIdNotFindException(id);
    }

    const job = await this.jobModel.findByIdAndDelete(id);

    if (!job) {
      throw new JobNotFind();
    }
  }

  async update(id: string, job: Job): Promise<Job> {
    if (!isValidObjectId(id)) {
      throw new JobIdNotFindException(id);
    }

    const newOne = await this.jobModel.findByIdAndUpdate(id, job, { new: true })
      .populate('address');

    if (!newOne) {
      throw new JobNotFind();
    }

    return newOne;
  }
}
