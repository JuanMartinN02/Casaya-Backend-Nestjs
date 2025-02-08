import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto);
  }

  @Get()
  findAll() {
    return this.addressService.findAll();
  }

  @Get(':address_id')
  findOne(@Param('address_id') address_id: number) {
    return this.addressService.findOne(+address_id);
  }

  @Put(':address_id') 
  async update(@Param('address_id', ParseIntPipe) address_id: number, @Body() updateAddressDto: UpdateAddressDto) {
    await this.addressService.update(address_id, updateAddressDto);
  }

  @Delete(':address_id')
  remove(@Param('address_id', ParseIntPipe) address_id: number) {
    return this.addressService.remove(address_id);
  }
}
