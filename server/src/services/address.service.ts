import { isValidObjectId, Model } from 'mongoose';

import {
  AddressIdIsIncorrectException,
  AddressIsExistsException,
  AddressNotFoundException,
} from '../exceptions';
import { AddressModel } from '../models';
import { Address } from '../types';

export class AddressService {
  private readonly addressModel: Model<Address> = AddressModel;

  async getAll(): Promise<Address[]> {
    return this.addressModel.find<Address>();
  }

  async getById(id: string): Promise<Address> {
    if (!isValidObjectId(id)) {
      throw new AddressIdIsIncorrectException(id);
    }

    const address = await this.addressModel.findById<Address>(id);

    if (!address) {
      throw new AddressNotFoundException();
    }

    return address;
  }

  async getOne(data: Address): Promise<Address> {
    const address = await this.addressModel.findOne<Address>({ ...data });

    if (!address) {
      throw new AddressNotFoundException();
    }

    return address;
  }

  async create(data: Address): Promise<Address> {
    const address = await this.addressModel.findOne<Address>({ ...data });

    if (address) {
      throw new AddressIsExistsException();
    }

    return this.addressModel.create<Address>(data);
  }

  async update(id: string, data: Address): Promise<Address> {
    if (!isValidObjectId(id)) {
      throw new AddressIdIsIncorrectException(id);
    }

    const newAddress = await this.addressModel
      .findByIdAndUpdate<Address>(id, { ...data }, { new: true });

    if (!newAddress) {
      throw new AddressNotFoundException();
    }

    return newAddress;
  }

  async delete(id: string): Promise<void> {
    if (!isValidObjectId(id)) {
      throw new AddressIdIsIncorrectException(id);
    }

    const address = await this.addressModel.findByIdAndDelete(id);

    if (!address) {
      throw new AddressNotFoundException();
    }
  }
}
