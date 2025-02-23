import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { updatePropertyParam } from './utils/types';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}

  async create(
    user_id: number,
    createPropertyDto: CreatePropertyDto
  ): Promise<Property> {
    const user = await this.userRepository.findOne({ where: { user_id } });
    if (!user) throw new HttpException('User not found. Cannot create property!', HttpStatus.BAD_REQUEST);
  
  
    const newProperty = this.propertyRepository.create({
      ...createPropertyDto,
      user,
    });
    return await this.propertyRepository.save(newProperty);
  }

  // Find all propertys for a given user
  async findAllByUser(user_id: number): Promise<Property[]> {
    const user = await this.userRepository.findOne({where: { user_id: user_id }});
    if(!user)
      throw new HttpException(
        'User not found. Cannot create property!',
        HttpStatus.BAD_REQUEST,
      );
    return this.propertyRepository.find({where: { user }})
  }

  //Find all properties
  async findAll(): Promise<Property[]>{
    return this.propertyRepository.find()
  }

  // Find a specific property for a given user
  async findOne(
    user_id: number,
    property_id: number,
  ): Promise<Property> {
    const user = await this.userRepository.findOne({where: { user_id: user_id }});
    if(!user)
      throw new HttpException(
        'User not found. Cannot create property!',
        HttpStatus.BAD_REQUEST,
      );

    const property = await this.propertyRepository.findOne({
      where: {property_id, user},
      relations: ['user'],
    });
    if(!property)
      throw new HttpException(
        'Property not found.',
        HttpStatus.NOT_FOUND,
      );
      

    return property;
  }

  // Update a specific property's details
  update(property_id: number, updatePropertyDetails: updatePropertyParam) {
    return this.propertyRepository.update({ property_id }, { ...updatePropertyDetails});
  }

  // Delete a specific property
  async remove(
    user_id: number,
    property_id: number,
  ): Promise<void> {
    const property = await this.findOne(user_id, property_id);
    await this.propertyRepository.remove(property);
  }
}
