import { Response } from 'express';
import { JobService } from '../services/job.service';
import {
  IdType,
  Job,
  JobWithAddress,
  UserRequest,
} from '../types';

export class JobController {
  constructor(
    private readonly jobService: JobService,
  ) {}

  getAll = async (_req: UserRequest, res: Response<Job[]>): Promise<void> => {
    const jobs = await this.jobService.getAll();
    res.json(jobs);
  };

  getById = async (req: UserRequest<IdType>, res: Response<Job>): Promise<void> => {
    const { id } = req.params;
    const job = await this.jobService.getById(id);
    res.json(job);
  };

  create = async (req: UserRequest<IdType, JobWithAddress>, res: Response<Job>): Promise<void> => {
    const { address: idAddress, ...job } = req.body;
    const newJob = await this.jobService.create(job, idAddress);
    res.json(newJob);
  };

  update = async (req: UserRequest<IdType, Job>, res: Response<Job>): Promise<void> => {
    const { id } = req.params;
    const newJob = await this.jobService.update(id, req.body);
    res.json(newJob);
  };

  delete = async (req: UserRequest<IdType>, res: Response): Promise<void> => {
    const { id } = req.params;
    await this.jobService.delete(id);
    res.sendStatus(200);
  };
}
