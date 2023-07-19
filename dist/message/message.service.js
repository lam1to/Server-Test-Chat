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
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let MessageService = exports.MessageService = class MessageService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createMessage(dto) {
        const message = await this.prisma.message.create({
            data: {
                chatId: +dto.chatId,
                userId: +dto.userId,
                content: dto.content,
            },
        });
        return message;
    }
    async updateMessage(dto) {
        const upMessage = await this.prisma.message.update({
            where: {
                id: +dto.messageId,
            },
            data: {
                content: dto.content,
            },
        });
        return upMessage;
    }
    async getAllForChat(id, idUser) {
        console.log('userId = ', idUser);
        const leftChat = await this.prisma.leftChat.findFirst({
            where: {
                chatId: +id,
                userId: +idUser,
            },
        });
        console.log('leftChat который нашел = ', leftChat);
        const messages = await this.prisma.message.findMany({
            where: {
                chatId: +id,
            },
        });
        if (leftChat) {
            const filterMessages = messages.filter((one) => {
                return one.createdAt.getTime() <= leftChat.createdAt.getTime() + 60000;
            });
            filterMessages.sort((one, two) => one.id - two.id);
            return filterMessages;
        }
        messages.sort((one, two) => one.id - two.id);
        return messages;
    }
    async remove(id) {
        const message = await this.prisma.message.delete({
            where: {
                id: +id,
            },
        });
        return message;
    }
    async messageLeft(dto, flag) {
        const user = await this.prisma.user.findFirst({
            where: {
                id: +dto.idUsers,
            },
        });
        const message = await this.prisma.message.create({
            data: {
                userId: +dto.idUsers,
                chatId: +dto.idChat,
                content: flag
                    ? `admin:${user.name} вышел из чата`
                    : `admin:${user.name} вступил(а) в чат`,
            },
        });
        if (flag) {
            return { message: message };
        }
        return { message: message, user: user };
    }
};
exports.MessageService = MessageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MessageService);
//# sourceMappingURL=message.service.js.map