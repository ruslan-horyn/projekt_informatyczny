import { HttpException } from './HttpException';

export class PostNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Post with id ${id} not found`);
  }
}
