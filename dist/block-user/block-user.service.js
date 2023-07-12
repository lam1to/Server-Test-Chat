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
exports.BlockUserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let BlockUserService = exports.BlockUserService = class BlockUserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createBlockUserDto) {
        const blockUserFind = await this.prisma.blockUser.findFirst({
            where: {
                user_Who_BlocketId: +createBlockUserDto.idUserWhoBlocked,
                user_Who_Was_BlocketId: +createBlockUserDto.idUserWhoWasBlocked,
            },
        });
        if (blockUserFind) {
            return blockUserFind;
        }
        const blockUser = await this.prisma.blockUser.create({
            data: {
                user_Who_BlocketId: +createBlockUserDto.idUserWhoBlocked,
                user_Who_Was_BlocketId: +createBlockUserDto.idUserWhoWasBlocked,
            },
        });
        return blockUser;
    }
    async remove(idUserWhoBlocked, idUserWhoWasBlocked) {
        const blockUser = await this.prisma.blockUser.findFirst({
            where: {
                user_Who_BlocketId: idUserWhoBlocked,
                user_Who_Was_BlocketId: idUserWhoWasBlocked,
            },
        });
        if (blockUser) {
            const deleteBlockUser = await this.prisma.blockUser.delete({
                where: {
                    id: blockUser.id,
                },
            });
            return deleteBlockUser;
        }
        return blockUser;
    }
    async findAllBlocked(idUser) {
        const BlockUsers = await this.prisma.blockUser.findMany({
            where: {
                user_Who_BlocketId: idUser,
            },
        });
        const BlockUsersId = BlockUsers.map((one) => {
            return one.user_Who_Was_BlocketId;
        });
        return BlockUsersId;
    }
    async findAllBlocker(idUser) {
        const BlockerUsers = await this.prisma.blockUser.findMany({
            where: {
                user_Who_Was_BlocketId: idUser,
            },
        });
        const BlockerUsersId = BlockerUsers.map((one) => {
            return one.user_Who_BlocketId;
        });
        return BlockerUsersId;
    }
    findOne(id) {
        return `This action returns a #${id} blockUser`;
    }
    update(id, updateBlockUserDto) {
        return `This action updates a #${id} blockUser`;
    }
};
exports.BlockUserService = BlockUserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BlockUserService);
//# sourceMappingURL=block-user.service.js.map