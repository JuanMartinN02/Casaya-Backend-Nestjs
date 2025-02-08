import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { updatePropertyParam } from './utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class PropertyService {
  constructor(
      @InjectRepository(Property)
      private readonly propertyRepository: Repository<Property>,
    ){}
  
    //Creates a new property
    async create(createPropertyDto: CreatePropertyDto): Promise<Property> {
      const property = this.propertyRepository.create(createPropertyDto);
      return this.propertyRepository.save(property)
    }
  
    //Returns all property
    async findAll(): Promise<Property[]> {
      //NOTE!! Delete relationships so this code is faster
      return this.propertyRepository.find({relations: [/**/]})
    }
  
    //Returns a specific property
    async findOne(property_id: number): Promise<Property> {
      const property = await this.propertyRepository.findOne({
        where: { property_id: property_id },
        relations: [/**/], 
      });
      if(!property){
        throw new NotFoundException(`Property with ID ${property_id} not found`);
      }
      return property;
    }
  
    update(property_id: number, updatePropertyDetails: updatePropertyParam) {
      return this.propertyRepository.update({ property_id }, { ...updatePropertyDetails});
    }
  
    async remove(property_id: number): Promise <void> {
      const property = await this.findOne(property_id);
      await this.propertyRepository.remove(property)
    }
}
