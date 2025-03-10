import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAllUsers(query: {
        username?: string;
        email?: string;
    }): Promise<User[]>;
    getUserById(id: string): Promise<User | null>;
}
