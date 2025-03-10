import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import bcrypt from 'bcrypt';
import { GetUsersParamsDto } from './dto/get-users-params.dto';


@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers(query: GetUsersParamsDto): Promise<User[]>{
    try{
      const {username, email} = query;
      const conditions: Prisma.UserWhereInput[] = [];
      if(username){
        conditions.push({
          name: {
            contains: username
          }
        });
      }
      if(email){
        conditions.push({
          email: {
            contains: email
          }
        });
      }

      const whereClause = conditions.length > 0? {AND: conditions} : {};
      return this.prisma.user.findMany({
        where: whereClause
      });
    }catch (e){
      throw new HttpException(`Failed to get all users: ${e.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserById(id: string): Promise<User | null>{
    try{
      return await this.prisma.user.findUnique({
        where: {
          id: Number(id)
        }
      })
    }catch (e){
      throw new HttpException(`Failed to find user by id: ${e.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<User>{
    try{
      const {name, email, password, avatar} = createUserDto;

      const role: {name: string, id: number} | null = await this.prisma.role.findFirst({
        where: { name: 'USER' }
      });

      if(!role){
        throw new HttpException('Role USER does not exist', HttpStatus.INTERNAL_SERVER_ERROR);
      }

      return await this.prisma.user.create({
        data: {
          email,
          password,
          name: name || email.split('@')[0],
          avatar: avatar || null,
          roleId: role.id
        }
      })
    }catch (e){
      if(e instanceof HttpException) throw e;
      throw new HttpException(`Failed to create user: ${e.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
