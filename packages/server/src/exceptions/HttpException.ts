export class HttpException extends Error {
  status: number;

  constructor(message: string, status = 404) {
    super(message);
    this.status = status;
  }
}
