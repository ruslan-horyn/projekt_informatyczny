import {
  Request, Response, Router,
} from 'express';
import asyncHandler from 'express-async-handler';

import { CreatePostDto } from '../dto';
import { PostNotFoundException } from '../exceptions';
import { validationMiddleware } from '../middleware';
import { PostModel } from '../models';
import { Controller, Post } from '../types';

export class PostsController implements Controller {
  path = '/posts';

  router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .get(this.path, asyncHandler(this.getAllPosts))
      .get(`${this.path}/:id`, asyncHandler(this.getPostById))
      .post(
        this.path,
        validationMiddleware(CreatePostDto),
        asyncHandler(this.createPost),
      )
      .patch(
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
  ) => {
    const { id } = req.params;

    const post = await PostModel.findById(id);

    if (!post) {
      throw new PostNotFoundException(id);
    }

    res.send(post);
  };

  createPost = async (req: Request, res: Response) => {
    const post = await PostModel.create({ ...req.body });
    res.status(201)
      .send(post);
  };

  modifyPost = async (req: Request, res: Response) => {
    const { id } = req.params;

    const { title, content, author } = req.body as Post;
    const findPost = await PostModel.findByIdAndUpdate(id, {
      title, content, author,
    }, { new: true });

    res.status(201)
      .send(findPost);
  };
}
