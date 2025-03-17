import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('Users') // Etiqueta para Swagger
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente', type: User })
  async create(@Body() createUserDto: CreateUserDto) {
    console.log('Received data:', createUserDto);
    const user = await this.userService.create(createUserDto);
    return { message: 'User created successfully', user };
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios', type: [User] })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':user_id')
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiParam({ name: 'user_id', type: 'integer', description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado', type: User })
  findOne(@Param('user_id', ParseIntPipe) user_id: number) {
    return this.userService.findOne(user_id);
  }

  @Put(':user_id')
  @ApiOperation({ summary: 'Actualizar un usuario por ID' })
  @ApiParam({ name: 'user_id', type: 'integer', description: 'ID del usuario a actualizar' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'Usuario actualizado exitosamente', type: User })
  async update(@Param('user_id', ParseIntPipe) user_id: number, @Body() updateUserDto: UpdateUserDto) {
    await this.userService.update(user_id, updateUserDto);
  }

  @Delete(':user_id')
  @ApiOperation({ summary: 'Eliminar un usuario por ID' })
  @ApiParam({ name: 'user_id', type: 'integer', description: 'ID del usuario a eliminar' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado exitosamente' })
  remove(@Param('user_id', ParseIntPipe) user_id: number) {
    return this.userService.remove(user_id);
  }

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }): Promise<User> {
    return this.userService.validateUser(loginDto.email, loginDto.password);
  }

  @Get('/email/:email')
  async getUserByEmail(@Param('email') email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Patch(':user_id/bookmark/:propertyId')
  async addBookmark(
    @Param('user_id') user_id: number,
    @Param('propertyId') propertyId: number
  ): Promise<User> {
    return this.userService.addBookmark(user_id, propertyId);
  }

  @Delete(':user_id/bookmark/:propertyId')
  async removeBookmark(
    @Param('user_id') user_id: number,
    @Param('propertyId') propertyId: number
  ): Promise<User> {
    return this.userService.removeBookmark(user_id, propertyId);
  }

}