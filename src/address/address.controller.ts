import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Address')  // Tag for grouping in Swagger
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new address' })
  @ApiBody({ type: CreateAddressDto })
  @ApiResponse({ status: 201, description: 'Address successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all addresses' })
  @ApiResponse({ status: 200, description: 'List of all addresses.' })
  findAll() {
    return this.addressService.findAll();
  }

  @Get(':address_id')
  @ApiOperation({ summary: 'Retrieve a specific address by ID' })
  @ApiParam({ name: 'address_id', required: true, description: 'ID of the address' })
  @ApiResponse({ status: 200, description: 'Address found.' })
  @ApiResponse({ status: 404, description: 'Address not found.' })
  findOne(@Param('address_id', ParseIntPipe) address_id: number) {
    return this.addressService.findOne(address_id);
  }

  @Put(':address_id')
  @ApiOperation({ summary: 'Update an existing address' })
  @ApiParam({ name: 'address_id', required: true, description: 'ID of the address to update' })
  @ApiBody({ type: UpdateAddressDto })
  @ApiResponse({ status: 200, description: 'Address successfully updated.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiResponse({ status: 404, description: 'Address not found.' })
  async update(@Param('address_id', ParseIntPipe) address_id: number, @Body() updateAddressDto: UpdateAddressDto) {
    await this.addressService.update(address_id, updateAddressDto);
  }

  @Delete(':address_id')
  @ApiOperation({ summary: 'Delete an address by ID' })
  @ApiParam({ name: 'address_id', required: true, description: 'ID of the address to delete' })
  @ApiResponse({ status: 200, description: 'Address successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Address not found.' })
  remove(@Param('address_id', ParseIntPipe) address_id: number) {
    return this.addressService.remove(address_id);
  }
}
