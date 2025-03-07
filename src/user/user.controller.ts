import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(@Query() query: {username?: string, email?: string}): Promise<User[]>{
    return this.userService.getAllUsers(query);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User | null>{
    return this.userService.getUserById(id);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User>{
    return this.userService.createUser(createUserDto);
  }
}
