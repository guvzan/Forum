import { UserService } from './user.service';
import { User } from '@prisma/client';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsers(query: {
        username?: string;
        email?: string;
    }): Promise<User[]>;
    getUserById(id: string): Promise<User | null>;
}
