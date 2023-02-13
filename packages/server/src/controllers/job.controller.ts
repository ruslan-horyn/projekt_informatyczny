import { Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import { JobDto, JobWithAddressDto } from '../dto';
import { authMiddleware, validationMiddleware } from '../middleware';
import { JobService } from '../services';
import {
  Controller,
  IdType,
  Job,
  JobWithAddress,
  UserRequest,
} from '../types';

export class JobController implements Controller {
  readonly path = '/jobs';

  readonly router = Router();

  private jobService: JobService = new JobService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router
      .all(`${this.path}`, authMiddleware)
      .all(`${this.path}/*`, authMiddleware)
      .get(`${this.path}`, asyncHandler(this.getAll))
      .get(`${this.path}/:id`, asyncHandler(this.getById))
      .delete(`${this.path}/:id`, asyncHandler(this.delete))
      .post(
        `${this.path}`,
        validationMiddleware(JobWithAddressDto),
        asyncHandler(this.create),
      )
      .patch(
        `${this.path}/:id`,
        validationMiddleware(JobDto, true),
        asyncHandler(this.update),
      );
  };

  private getAll = async (_req: UserRequest, res: Response<Job[]>) => {
    const jobs = await this.jobService.getAll();

    res.json(jobs);
  };

  private getById = async (req: UserRequest<IdType>, res: Response<Job>) => {
    const { id } = req.params;
    const job = await this.jobService.getById(id);
    res.json(job);
  };

  private create = async (req: UserRequest<IdType, JobWithAddress>, res: Response<Job>) => {
    const { address: idAddress, ...job } = req.body;
    const newJob = await this.jobService.create(job, idAddress);
    res.json(newJob);
  };

  private update = async (req: UserRequest<IdType, Job>, res: Response<Job>) => {
    const { id } = req.params;
    const newJob = await this.jobService.update(id, req.body);
    res.json(newJob);
  };

  private delete = async (req: UserRequest<IdType>, res: Response) => {
    const { id } = req.params;
    await this.jobService.delete(id);
    res.sendStatus(200);
  };
}
