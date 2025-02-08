import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Controller('Properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertyService.create(createPropertyDto);
  }

  @Get()
  findAll() {
    return this.propertyService.findAll();
  }

  @Get(':property_id')
  findOne(@Param('property_id') property_id: number) {
    return this.propertyService.findOne(+property_id);
  }

  @Put(':property_id') 
  async update(@Param('property_id', ParseIntPipe) property_id: number, @Body() updatePropertyDto: UpdatePropertyDto) {
    await this.propertyService.update(property_id, updatePropertyDto);
  }

  @Delete(':property_id')
  remove(@Param('property_id', ParseIntPipe) property_id: number) {
    return this.propertyService.remove(property_id);
  }
}
