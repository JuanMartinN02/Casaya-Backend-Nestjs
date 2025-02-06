
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { updateUserParam } from './utils/types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}

  //Creates a new user
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user)
  }

  //Returns all user
  async findAll(): Promise<User[]> {
    //NOTE!! Delete relationships so this code is faster
    return this.userRepository.find({relations: [/**/]})
  }

  //Returns a specific user
  async findOne(user_id: number): Promise<User> {
    //NOTE!! Delete relationships so this code is faster
    const user = await this.userRepository.findOne({
      where: { user_id: user_id },
      relations: [/**/], 
    });
    if(!user){
      throw new NotFoundException(`User with ID ${user_id} not found`);
    }
    return user;
  }

  update(user_id: number, updateUserDetails: updateUserParam) {
    return this.userRepository.update({ user_id }, { ...updateUserDetails});
  }

  async remove(user_id: number): Promise <void> {
    const user = await this.findOne(user_id);
    await this.userRepository.remove(user)
  }
}
