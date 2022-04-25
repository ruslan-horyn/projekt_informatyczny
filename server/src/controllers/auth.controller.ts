import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import { EnterRequiredFieldException } from '../exceptions/Auth.exceptions';
import { UserPassIsInvalidException } from '../exceptions/User.exceptions';
import ControllerI from '../types/controller.type';
import UserService from '../services/user.service';
import { generateToken } from '../utils/jwt';
import { doPasswordsMatch } from '../utils/password';

class AuthController implements ControllerI {
  public readonly path = '/auth';
  
  public readonly router = Router();
  
  private userService: UserService = new UserService();
  
  constructor() {
    this.initializeRoutes();
  }
  
  private initializeRoutes = () => {
    this.router
      .get(`${this.path}/login`, asyncHandler(this.login))
      .get(`${this.path}/logout`, asyncHandler(this.loggingOut));
  };
  
  private login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new EnterRequiredFieldException();
    }
    
    const user = await this.userService.getUserByEmail(email);
    const isValid = doPasswordsMatch(password, user.password);
    if (!isValid) {
      throw new UserPassIsInvalidException();
    }
    
    await user.populate('roles');
    const tokenData = generateToken(user);
    
    user.password = undefined;
    res.send({ token: tokenData.token, user });
  };
  
  private loggingOut = async (_req: Request, res: Response) => {
    res.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
    res.send(200);
  };
}

export default AuthController;
