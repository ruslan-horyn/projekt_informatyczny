import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { JobController } from '../controllers/job.controller';
import { JobDto } from '../dto';
import { authMiddleware, validationMiddleware } from '../middleware';
import { permissionMiddleware } from '../middleware/permission.middleware';
import { JobService } from '../services/job.service';

const jobRouter = () => {
  const router = Router();
  const path = '/jobs';

  const jobService = new JobService();
  const jobController = new JobController(jobService);

  router
    .all(`${path}`, authMiddleware, permissionMiddleware(['admin']))
    .all(`${path}/*`, authMiddleware, permissionMiddleware(['admin']))
    .get(`${path}`, expressAsyncHandler(jobController.getAll))
    .get(`${path}/:id`, expressAsyncHandler(jobController.getById))
    .delete(`${path}/:id`, expressAsyncHandler(jobController.delete))
    .post(
      path,
      validationMiddleware(JobDto),
      expressAsyncHandler(jobController.create),
    );

  return router;
};

export default jobRouter;
