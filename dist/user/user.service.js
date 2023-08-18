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
const prisma_service_1 = require("../prisma.service");
let UserService = exports.UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getUserId(idUser) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: +idUser.id,
            },
        });
        return user;
    }
    async getAllUsers(id) {
        const users = await this.prisma.user.findMany({
            where: {
                id: { not: +id },
            },
        });
        return { users: users };
    }
    async updateUserAvatar(dto) {
        const user = await this.getUserId({ id: dto.id });
        if (user) {
            console.log('avatar path = ', dto.avatar_path);
            await this.prisma.user.update({
                where: {
                    id: +dto.id,
                },
                data: {
                    avatarPath: dto.avatar_path,
                },
            });
            const userReturn = await this.getUserId({ id: dto.id });
            return userReturn;
        }
    }
    async updateName(id, name) {
        await this.prisma.user.update({
            where: {
                id: +id,
            },
            data: {
                name: name,
            },
        });
    }
    async updateLastName(id, lastName) {
        await this.prisma.user.update({
            where: {
                id: +id,
            },
            data: {
                lastName: lastName,
            },
        });
    }
    async updateFi(id, dto) {
        await this.prisma.user.update({
            where: {
                id: +id,
            },
            data: {
                name: dto.name,
                lastName: dto.lastName,
            },
        });
    }
    async updateUserFi(dto, id) {
        const user = await this.getUserId({ id: id });
        if (user) {
            if (dto.name !== user.name) {
                await this.updateName(id, dto.name);
            }
            if (dto.lastName !== user.lastName) {
                await this.updateLastName(id, dto.lastName);
            }
            if (dto.lastName !== user.lastName && dto.name !== user.name) {
                await this.updateFi(id, dto);
            }
            const userReturn = await this.getUserId({ id: id });
            return userReturn;
        }
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map