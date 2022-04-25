import { Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import { CreateJobDto } from '../dto/job.dto';
import validationMiddleware from '../middleware/validation.middleware';
import JobService from '../services/job.service';
import { RequestWithUser } from '../types/auth.type';
import ControllerI from '../types/controller.type';
import { JobI } from '../types/job.type';

class AuthController implements ControllerI {
  public readonly path = '/jobs';
  
  public readonly router = Router();
  
  private jobService: JobService = new JobService();
  
  constructor() {
    this.initializeRoutes();
  }
  
  private initializeRoutes = () => {
    this.router
      .get(`${this.path}`, asyncHandler(this.getAllJobs))
      .get(`${this.path}/:id`, asyncHandler(this.getJobById))
      .delete(`${this.path}/:id`, asyncHandler(this.deleteJob))
      .post(
        `${this.path}`,
        validationMiddleware(CreateJobDto),
        asyncHandler(this.createJob),
      )
      .patch(
        `${this.path}/:id`,
        validationMiddleware(CreateJobDto, true),
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
    const jobs = await this.jobService.createJob(req.body as JobI);
    res.json(jobs);
  };
  
  private updateJob = async (req: RequestWithUser, res: Response) => {
    const { id } = req.params;
    const job = req.body as JobI;
    const jobs = await this.jobService.updateJob(id, job);
    res.json(jobs);
  };
  
  private deleteJob = async (req: RequestWithUser, res: Response) => {
    const { id } = req.params;
    const jobs = await this.jobService.deleteJob(id);
    res.json(jobs);
  };
}

export default AuthController;
