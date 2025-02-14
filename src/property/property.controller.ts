import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Controller('users')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

   //Create a property for a user
   @Post(':user_id/properties')
   create(
     @Param('user_id', ParseIntPipe) user_id: number,
     @Body() createPropertyDto: CreatePropertyDto,
   ) {
     return this.propertyService.create(user_id, createPropertyDto);
   }
 
   // Get all properties for a specific user
   @Get(':user_id/properties') 
   findAll(@Param('user_id', ParseIntPipe) user_id: number) {
     return this.propertyService.findAll(user_id);
   }
 
   // Get a specific property for a specific user
   @Get(':user_id/properties/:property_id') 
   findOne(
     @Param('user_id', ParseIntPipe) user_id: number,
     @Param('property_id', ParseIntPipe) property_id: number,
   ) {
     return this.propertyService.findOne(user_id, property_id);
   }
 
   // Update a specific property for a user
   @Patch(':user_id/properties/:property_id')
   update(
     @Param('property_id', ParseIntPipe) property_id: number,
     @Body() updatePropertyDto: UpdatePropertyDto
   ) {
     return this.propertyService.update(property_id, updatePropertyDto);
   }
 
   // Delete a specific property for a user
   @Delete(':user_id/properties/:property_id') 
   remove(
     @Param('user_id', ParseIntPipe) user_id: number,
     @Param('property_id', ParseIntPipe) property_id: number
   ) {
     return this.propertyService.remove(user_id, property_id);
   }
}
