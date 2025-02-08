import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { updateAddressParam } from './utils/types';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ){}

  //Creates a new address
  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    const address = this.addressRepository.create(createAddressDto);
    return this.addressRepository.save(address)
  }

  //Returns all address
  async findAll(): Promise<Address[]> {
    //NOTE!! Delete relationships so this code is faster
    return this.addressRepository.find({relations: [/**/]})
  }

  //Returns a specific address
  async findOne(address_id: number): Promise<Address> {
    const address = await this.addressRepository.findOne({
      where: { address_id: address_id },
      relations: [/**/], 
    });
    if(!address){
      throw new NotFoundException(`Address with ID ${address_id} not found`);
    }
    return address;
  }

  update(address_id: number, updateAddressDetails: updateAddressParam) {
    return this.addressRepository.update({ address_id }, { ...updateAddressDetails});
  }

  async remove(address_id: number): Promise <void> {
    const address = await this.findOne(address_id);
    await this.addressRepository.remove(address)
  }
}
