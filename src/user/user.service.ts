import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async getAllUsers(query: {username?: string, email?: string}): Promise<User[]>{
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

    const whereClause = conditions.length > 0? {OR: conditions} : {};
    return this.prisma.user.findMany({
      where: whereClause
    });
  }
}
