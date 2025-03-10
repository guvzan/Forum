import { UserService } from './user.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsers(query: {
        username?: string;
        email?: string;
    }): Promise<User[]>;
    getUserById(id: string): Promise<UserDto>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
}
