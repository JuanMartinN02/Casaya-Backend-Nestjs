import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':user_id')
  findOne(@Param('user_id') user_id: number) {
    return this.userService.findOne(+user_id);
  }

  //NOTA! VERIFICAR, NO FUNCIONA BIEN
  @Put(':user_id') //Patch only patches the entity while Put replaces the whole entity. NOTE! Choose one. (Put is better IMO)
  async update(@Param('user_id', ParseIntPipe) user_id: number, @Body() updateUserDto: UpdateUserDto) {
    await this.userService.update(user_id, updateUserDto);
  }

  @Delete(':user_id')
  remove(@Param('user_id', ParseIntPipe) user_id: number) {
    return this.userService.remove(user_id);
  }
}