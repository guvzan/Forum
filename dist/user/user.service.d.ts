import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersParamsDto } from './dto/get-users-params.dto';
import { UserDto } from './dto/user.dto';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAllUsers(query: GetUsersParamsDto): Promise<User[]>;
    getUserById(id: string): Promise<UserDto>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
}
