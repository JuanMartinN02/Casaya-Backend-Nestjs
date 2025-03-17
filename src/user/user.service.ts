import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { updateUserParam } from './utils/types';
import * as bcrypt from 'bcrypt';
import { Property } from 'src/property/entities/property.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Property)
      private readonly propertyRepository: Repository<Property>
  ){}

  //Creates a new user
  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,  // Guarda la contraseña encriptada
    });
  
    return this.userRepository.save(user);
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

  async addBookmark(user_id: number, property_id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { user_id: user_id } });
  
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    // Verifica si la propiedad ya está en los bookmarks
    if (user.bookmarks.includes(property_id)) {
      throw new BadRequestException('Property already bookmarked');
    }
  
    // Agregar el property_id al array de bookmarks
    user.bookmarks.push(property_id);
  
    return this.userRepository.save(user);
  }

  async removeBookmark(user_id: number, property_id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { user_id: user_id } });

    if (!user) {
        throw new NotFoundException('User not found');
    }

    const propertyIdNumber = Number(property_id); // Convertimos property_id a número

    // Verifica si la propiedad está en los bookmarks
    if (!user.bookmarks.includes(propertyIdNumber)) {
        throw new BadRequestException('Property is not bookmarked');
    }

    // Remover el property_id del array de bookmarks
    user.bookmarks = user.bookmarks.filter(id => id !== propertyIdNumber);

    return this.userRepository.save(user);
  }
}
