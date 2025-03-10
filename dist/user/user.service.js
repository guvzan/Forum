"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const user_dto_1 = require("./dto/user.dto");
const class_transformer_1 = require("class-transformer");
let UserService = class UserService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllUsers(query) {
        try {
            const { username, email } = query;
            const conditions = [];
            if (username) {
                conditions.push({
                    name: {
                        contains: username
                    }
                });
            }
            if (email) {
                conditions.push({
                    email: {
                        contains: email
                    }
                });
            }
            const whereClause = conditions.length > 0 ? { AND: conditions } : {};
            return this.prisma.user.findMany({
                where: whereClause
            });
        }
        catch (e) {
            throw new common_1.HttpException(`Failed to get all users: ${e.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getUserById(id) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id: Number(id)
                }
            });
            if (!user)
                throw new common_1.HttpException(`User with id ${id} not found`, common_1.HttpStatus.NOT_FOUND);
            return (0, class_transformer_1.plainToInstance)(user_dto_1.UserDto, user);
        }
        catch (e) {
            if (e instanceof common_1.HttpException)
                throw e;
            throw new common_1.HttpException(`Failed to find user by id: ${e.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createUser(createUserDto) {
        try {
            const { name, email, password, avatar } = createUserDto;
            const role = await this.prisma.role.findFirst({
                where: { name: 'USER' }
            });
            if (!role) {
                throw new common_1.HttpException('Role USER does not exist', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return await this.prisma.user.create({
                data: {
                    email,
                    password,
                    name: name || email.split('@')[0],
                    avatar: avatar || null,
                    roleId: role.id
                }
            });
        }
        catch (e) {
            if (e instanceof common_1.HttpException)
                throw e;
            throw new common_1.HttpException(`Failed to create user: ${e.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map