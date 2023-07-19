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
exports.LeftChatService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let LeftChatService = exports.LeftChatService = class LeftChatService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const leftChat = await this.prisma.leftChat.findFirst({
            where: {
                userId: +dto.idUsers,
                chatId: +dto.idChat,
            },
        });
        if (!leftChat) {
            const createleftChat = await this.prisma.leftChat.create({
                data: {
                    userId: +dto.idUsers,
                    chatId: +dto.idChat,
                },
            });
            return createleftChat;
        }
        return leftChat;
    }
    async delete(dto) {
        const leftChat = await this.prisma.leftChat.findFirst({
            where: {
                userId: +dto.idUsers,
                chatId: +dto.idChat,
            },
        });
        if (leftChat) {
            const deleteLeftChat = await this.prisma.leftChat.delete({
                where: {
                    id: (await this.prisma.leftChat.findFirst({
                        where: {
                            userId: +dto.idUsers,
                            chatId: +dto.idChat,
                        },
                    })).id,
                },
            });
            return deleteLeftChat;
        }
        return leftChat;
    }
    async findAll(id) {
        const allLeftChat = await this.prisma.leftChat.findMany({
            where: {
                userId: +id,
            },
        });
        return allLeftChat.map((one) => one.chatId);
    }
};
exports.LeftChatService = LeftChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LeftChatService);
//# sourceMappingURL=left-chat.service.js.map