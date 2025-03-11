import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersParamsDto } from './dto/get-users-params.dto';
import { UserDto } from './dto/user.dto';
import { UserProfileDto } from './dto/user-profile.dto';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAllUsers(query: GetUsersParamsDto): Promise<UserDto[]>;
    getUserById(id: string): Promise<UserDto>;
    getUserProfile(id: string): Promise<UserProfileDto>;
    createUser(createUserDto: CreateUserDto): Promise<UserDto>;
}
