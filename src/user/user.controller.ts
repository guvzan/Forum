import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { GetUsersParamsDto } from './dto/get-users-params.dto';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(@Query() query: GetUsersParamsDto): Promise<UserDto[]>{
    return this.userService.getAllUsers(query);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserDto>{
    return this.userService.getUserById(id);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto>{
    return this.userService.createUser(createUserDto);
  }
}
