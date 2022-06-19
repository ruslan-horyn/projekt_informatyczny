import {
  NextFunction, Request, Response, Router,
} from 'express';
import asyncHandler from 'express-async-handler';
import { CreatePostDto } from '../dto';
import { PostNotFoundException } from '../exceptions';
import { validationMiddleware } from '../middleware';
import { PostModel } from '../models';
import { ControllerI } from '../types';

export class PostsController implements ControllerI {
  public path = '/posts';
  
  public router = Router();
  
  constructor() {
    this.initializeRoutes();
  }
  
  public initializeRoutes() {
    this.router.get(this.path, asyncHandler(this.getAllPosts));
    this.router.get(`${this.path}/:id`, asyncHandler(this.getPostById));
    this.router.post(
      this.path,
      validationMiddleware(CreatePostDto),
      asyncHandler(this.createPost),
    );
    this.router.patch(
      `${this.path}/:id`,
      validationMiddleware(CreatePostDto, true),
      asyncHandler(this.modifyPost),
    );
  }
  
  private getAllPosts = async (_req: Request, res: Response) => {
    const posts = await PostModel.find();
    res.send(posts);
  };
  
  private getPostById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { id } = req.params;
    const post = await PostModel.findById(id);
    post
      ? res.send(post)
      : next(new PostNotFoundException(id));
  };
  
  createPost = async (req: Request, res: Response) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const post = await PostModel.create(...req.body);
    res.status(201)
      .send(post);
  };
  
  modifyPost = async (req: Request, res: Response) => {
    const { id } = req.params;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { title, content, author } = req.body;
    const findPost = await PostModel.findByIdAndUpdate(id, {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      title, content, author,
    }, { new: true });
    
    res.status(201)
      .send(findPost);
  };
}
