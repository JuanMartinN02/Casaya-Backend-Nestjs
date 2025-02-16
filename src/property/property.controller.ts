import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Properties')
@Controller('users')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @ApiOperation({ summary: 'Create a property for a user' })
  @ApiParam({ name: 'user_id', type: Number, description: 'User ID' })
  @ApiParam({ name: 'address_id', type: Number, description: 'Address ID' })
  @ApiBody({ type: CreatePropertyDto })
  @Post(':user_id/properties/:address_id')
  create(
    @Param('user_id', ParseIntPipe) user_id: number,
    @Param('address_id', ParseIntPipe) address_id: number,
    @Body() createPropertyDto: CreatePropertyDto,
  ) {
    return this.propertyService.create(user_id, address_id, createPropertyDto);
  }

  @ApiOperation({ summary: 'Get all properties for a specific user' })
  @ApiParam({ name: 'user_id', type: Number, description: 'User ID' })
  @Get(':user_id/properties') 
  findAll(@Param('user_id', ParseIntPipe) user_id: number) {
    return this.propertyService.findAll(user_id);
  }

  @ApiOperation({ summary: 'Get a specific property for a user' })
  @ApiParam({ name: 'user_id', type: Number, description: 'User ID' })
  @ApiParam({ name: 'property_id', type: Number, description: 'Property ID' })
  @Get(':user_id/properties/:property_id') 
  findOne(
    @Param('user_id', ParseIntPipe) user_id: number,
    @Param('property_id', ParseIntPipe) property_id: number,
  ) {
    return this.propertyService.findOne(user_id, property_id);
  }

  @ApiOperation({ summary: 'Update a specific property for a user' })
  @ApiParam({ name: 'property_id', type: Number, description: 'Property ID' })
  @ApiBody({ type: UpdatePropertyDto })
  @Patch(':user_id/properties/:property_id')
  update(
    @Param('property_id', ParseIntPipe) property_id: number,
    @Body() updatePropertyDto: UpdatePropertyDto
  ) {
    return this.propertyService.update(property_id, updatePropertyDto);
  }

  @ApiOperation({ summary: 'Delete a specific property for a user' })
  @ApiParam({ name: 'user_id', type: Number, description: 'User ID' })
  @ApiParam({ name: 'property_id', type: Number, description: 'Property ID' })
  @Delete(':user_id/properties/:property_id') 
  remove(
    @Param('user_id', ParseIntPipe) user_id: number,
    @Param('property_id', ParseIntPipe) property_id: number
  ) {
    return this.propertyService.remove(user_id, property_id);
  }
}
