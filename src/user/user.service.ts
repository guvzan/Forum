import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersParamsDto } from './dto/get-users-params.dto';
import { UserDto } from './dto/user.dto';
import { plainToInstance } from 'class-transformer';
import { UserProfileDto } from './dto/user-profile.dto';


@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers(query: GetUsersParamsDto): Promise<UserDto[]>{
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
      const users: User[] = await this.prisma.user.findMany({
        where: whereClause
      });
      return plainToInstance(UserDto, users);
    }catch (e){
      throw new HttpException(`Failed to get all users: ${e.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserById(id: string): Promise<UserDto>{
    try{
      const user: User | null = await this.prisma.user.findUnique({
        where: {
          id: Number(id)
        }
      });
      if(!user) throw new HttpException(`User with id ${id} not found`, HttpStatus.NOT_FOUND);
      return plainToInstance(UserDto, user);
    }catch (e){
      if(e instanceof HttpException) throw e;
      throw new HttpException(`Failed to find user by id: ${e.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserProfile(id: string): Promise<UserProfileDto>{
    try{
      const user: User | null = await this.prisma.user.findUnique({
        where: {
          id: Number(id)
        }
      });
      if(!user) throw new HttpException(`Profile with id ${id} not found`, HttpStatus.NOT_FOUND);
      return plainToInstance(UserProfileDto, user);
    }catch (e){
      throw new HttpException(`Failed to get profile by id: ${e.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserDto>{
    try{
      const {name, email, password, avatar} = createUserDto;

      const role: {name: string, id: number} | null = await this.prisma.role.findFirst({
        where: { name: 'USER' }
      });

      if(!role){
        throw new HttpException('Role USER does not exist', HttpStatus.INTERNAL_SERVER_ERROR);
      }

      const user: User = await this.prisma.user.create({
        data: {
          email,
          password,
          name: name || email.split('@')[0],
          avatar: avatar || null,
          roleId: role.id
        }
      });
      return plainToInstance(UserDto, user);
    }catch (e){
      if(e instanceof HttpException) throw e;
      throw new HttpException(`Failed to create user: ${e.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
