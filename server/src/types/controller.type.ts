import { Router } from 'express';

interface ControllerI {
  path: string;
  router: Router;
}

export default ControllerI;
