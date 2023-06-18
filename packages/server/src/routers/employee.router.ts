import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { EmployeeController } from '../controllers/employee.controller';
import { EmployeeDto } from '../dto';
import { authMiddleware, validationMiddleware } from '../middleware';
import { permissionMiddleware } from '../middleware/permission.middleware';
import { EmployeeService } from '../services/employee.service';

const employeeRouter = () => {
  const router = Router();
  const path = '/employee';

  const employeeService = new EmployeeService();
  const employeeController = new EmployeeController(employeeService);

  router
    .all(`${path}`, authMiddleware, permissionMiddleware(['admin']))
    .all(`${path}/*`, authMiddleware, permissionMiddleware(['admin']))
    .get(`${path}`, expressAsyncHandler(employeeController.getAll))
    .get(`${path}/:id`, expressAsyncHandler(employeeController.getById))
    .delete(`${path}/:id`, expressAsyncHandler(employeeController.delete))
    .post(
      `${path}`,
      validationMiddleware(EmployeeDto),
      expressAsyncHandler(employeeController.create),
    )
    .patch(
      `${path}/:id`,
      validationMiddleware(EmployeeDto, true),
      expressAsyncHandler(employeeController.update),
    );

  return router;
};

export default employeeRouter;
