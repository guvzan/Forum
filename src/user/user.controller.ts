import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { GetUsersParamsDto } from './dto/get-users-params.dto';
import { UserProfileDto } from './dto/user-profile.dto';
import { UpdateUserDto } from './dto/updateUser.dto';


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

  @Get('profile/:id')
  async getUserProfile(@Param('id') id: string): Promise<UserProfileDto>{
    return this.userService.getUserProfile(id);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto>{
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UserDto>{
    return this.userService.updateUser(id, updateUserDto);
  }
}
