import { Response, Router } from 'express';
import asyncHandler from 'express-async-handler';

import { CreateJobWithAddressDto } from '../dto';
import { authMiddleware, validationMiddleware } from '../middleware';
import JobService from '../services/job.service';
import {
  Controller, Job, JobWithAddress, RequestWithUser,
} from '../types';

export class JobController implements Controller {
  public readonly path = '/jobs';

  public readonly router = Router();

  private jobService: JobService = new JobService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router
      .get(`${this.path}`, authMiddleware, asyncHandler(this.getAllJobs))
      .get(`${this.path}/:id`, asyncHandler(this.getJobById))
      .delete(`${this.path}/:id`, asyncHandler(this.deleteJob))
      .post(
        `${this.path}`,
        validationMiddleware(CreateJobWithAddressDto),
        asyncHandler(this.createJob),
      )
      .patch(
        `${this.path}/:id`,
        validationMiddleware(CreateJobWithAddressDto, true),
        asyncHandler(this.updateJob),
      );
  };

  private getAllJobs = async (_req: RequestWithUser, res: Response) => {
    const jobs = await this.jobService.getAllJobs();
    res.json(jobs);
  };

  private getJobById = async (req: RequestWithUser, res: Response) => {
    const { id } = req.params;
    const jobs = await this.jobService.getJobById(id);
    res.json(jobs);
  };

  private createJob = async (req: RequestWithUser, res: Response) => {
    const jobs = await this.jobService.createJob(req.body as JobWithAddress);
    res.json(jobs);
  };

  private updateJob = async (req: RequestWithUser, res: Response) => {
    const { id } = req.params;
    const job = req.body as JobWithAddress;
    const jobNew = await this.jobService.updateJob(id, job);
    res.json(jobNew);
  };

  private deleteJob = async (req: RequestWithUser, res: Response) => {
    const { id } = req.params;
    const jobs = await this.jobService.deleteJob(id);
    res.json(jobs);
  };
}
