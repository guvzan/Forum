import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { GetUsersParamsDto } from './dto/get-users-params.dto';
import { UserProfileDto } from './dto/user-profile.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsers(query: GetUsersParamsDto): Promise<UserDto[]>;
    getUserById(id: string): Promise<UserDto>;
    getUserProfile(id: string): Promise<UserProfileDto>;
    createUser(createUserDto: CreateUserDto): Promise<UserDto>;
}
