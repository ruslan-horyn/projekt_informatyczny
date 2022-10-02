import { Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import { AddressDto } from '../dto';
import { authMiddleware, validationMiddleware } from '../middleware';
import { AddressService } from '../services/address.service';
import {
  Address,
  Controller,
  IdType,
  UserRequest,
} from '../types';

export class AddressController implements Controller {
  readonly path = '/address';

  readonly router = Router();

  private addressService: AddressService = new AddressService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router
      .all(`${this.path}`, authMiddleware)
      .all(`${this.path}/*`, authMiddleware)
      .get(`${this.path}`, asyncHandler(this.getAll))
      .get(`${this.path}/:id`, asyncHandler(this.getById))
      .delete(`${this.path}/:id`, asyncHandler(this.delete))
      .post(
        `${this.path}`,
        validationMiddleware(AddressDto),
        asyncHandler(this.create),
      )
      .patch(
        `${this.path}/:id`,
        validationMiddleware(AddressDto, true),
        asyncHandler(this.update),
      );
  };

  private getAll = async (_req: UserRequest, res: Response<Address[]>) => {
    const address = await this.addressService.getAll();
    res.json(address);
  };

  private getById = async (req: UserRequest<IdType>, res: Response<Address>) => {
    const { id } = req.params;
    const address = await this.addressService.getById(id);
    res.json(address);
  };

  private create = async (req: UserRequest<unknown, Address>, res: Response<Address>) => {
    const address = await this.addressService.create(req.body);
    res.json(address);
  };

  private update = async (req: UserRequest<IdType, Address>, res: Response<Address>) => {
    const { id } = req.params;
    const address = await this.addressService.update(id, req.body);
    res.json(address);
  };

  private delete = async (req: UserRequest<IdType>, res: Response) => {
    const { id } = req.params;
    await this.addressService.delete(id);
    res.sendStatus(200);
  };
}
