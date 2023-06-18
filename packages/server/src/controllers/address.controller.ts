import { Response } from 'express';
import { AddressService } from '../services/address.service';
import {
  Address,
  IdType,
  UserRequest,
} from '../types';

export class AddressController {
  constructor(
    private readonly addressService: AddressService,
  ) {}

  getAll = async (_req: UserRequest, res: Response<Address[]>): Promise<void> => {
    const address = await this.addressService.getAll();
    res.json(address);
  };

  getById = async (req: UserRequest<IdType>, res: Response<Address>): Promise<void> => {
    const { id } = req.params;
    const address = await this.addressService.getById(id);
    res.json(address);
  };

  create = async (req: UserRequest<unknown, Address>, res: Response<Address>): Promise<void> => {
    const address = await this.addressService.create(req.body);
    res.json(address);
  };

  update = async (req: UserRequest<IdType, Address>, res: Response<Address>): Promise<void> => {
    const { id } = req.params;
    const address = await this.addressService.update(id, req.body);
    res.json(address);
  };

  delete = async (req: UserRequest<IdType>, res: Response): Promise<void> => {
    const { id } = req.params;
    await this.addressService.delete(id);
    res.sendStatus(200);
  };
}
