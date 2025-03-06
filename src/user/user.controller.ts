import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { query } from 'express';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(@Query() query: {username?: string, email?: string}): Promise<User[]>{
    return this.userService.getAllUsers(query);
  }
}
