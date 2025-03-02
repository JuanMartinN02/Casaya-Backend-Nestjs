
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { updateUserParam } from './utils/types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}

  //Creates a new user
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      console.log('Saving user:', createUserDto);  // Verifica si los datos se están recibiendo
      const user = await this.userRepository.save(createUserDto);
      console.log('User saved:', user);  // Verifica que el usuario se guarde correctamente
      return user;
    } catch (error) {
      console.error('Error saving user:', error);  // Captura cualquier error al guardar
      throw error;  // Vuelve a lanzar el error si es necesario
    }
  }

  //Returns all user
  async findAll(): Promise<User[]> {
    //NOTE!! Delete relationships so this code is faster
    return this.userRepository.find({relations: [/**/]})
  }

  //Returns a specific user
  async findOne(user_id: number): Promise<User> {
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

  //Encontrar user por email
  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  //validar usuario para el login
  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.findByEmail(email);

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
