import { Model } from 'mongoose';

import {
  JobIdNotFindException,
  JobNotFind,
} from '../exceptions';
import { JobModel } from '../models';
import { Job } from '../types';

class JobService {
  private readonly model: Model<Job>;

  constructor() {
    this.model = JobModel;
  }

  async getAllJobs() {
    return this.model.find();
  }

  async getJobById(id: string) {
    if (!id) {
      throw new JobIdNotFindException(id);
    }

    const job = await this.model.findById(id);

    if (!job) {
      throw new JobNotFind();
    }

    return job;
  }

  async createJob(job: Job) {
    return this.model.create({ ...job });
  }

  async deleteJob(id: string) {
    if (!id) {
      throw new JobIdNotFindException(id);
    }

    const job = await this.model.findByIdAndDelete(id);

    if (!job) {
      throw new JobNotFind();
    }

    return job;
  }

  async updateJob(id: string, job: Job) {
    if (!id) {
      throw new JobIdNotFindException(id);
    }

    return this.model.findByIdAndUpdate(id, job, { new: true });
  }
}

export default JobService;
