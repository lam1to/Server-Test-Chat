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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageStatusService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const message_service_1 = require("../message/message.service");
let MessageStatusService = exports.MessageStatusService = class MessageStatusService {
    constructor(prisma, message) {
        this.prisma = prisma;
        this.message = message;
    }
    async editOne(userId, messageId, chatId) {
        const messageStatus = await this.prisma.messageStatus.findFirst({
            where: {
                userId: userId,
                chatId: chatId,
            },
        });
        if (messageStatus) {
            await this.prisma.messageStatus.update({
                where: {
                    id: messageStatus.id,
                },
                data: {
                    lastMessageId: messageId,
                },
            });
        }
    }
    async createOrEdit(userId, messageId, chatId) {
        const messageStatus = await this.prisma.messageStatus.findFirst({
            where: {
                userId: userId,
                chatId: chatId,
            },
        });
        if (messageStatus && Object.keys(messageStatus).length !== 0) {
            await this.editOne(userId, messageId, chatId);
        }
        else {
            await this.createOne(userId, messageId, chatId);
        }
    }
    async createOne(userId, messageId, chatId) {
        await this.prisma.messageStatus.create({
            data: {
                userId: userId,
                lastMessageId: messageId,
                chatId: chatId,
            },
        });
    }
    async editOrDeleteWhenDeleteOneMessage(userId, messageId, chatId) {
        const index = await this.message.findIndex(userId, messageId, chatId);
        console.log('index который мы получили = ', index);
        if (index === 0) {
            await this.deleteAll(chatId);
        }
        else {
            const newIndex = index - 1;
            const newMessage = await this.message.findMessageByIndex(userId, newIndex, chatId);
            await this.prisma.messageStatus.updateMany({
                where: {
                    id: {
                        in: (await this.prisma.messageStatus.findMany({
                            where: {
                                lastMessageId: messageId,
                                chatId: chatId,
                            },
                        })).map((oneMessageStatus) => oneMessageStatus.id),
                    },
                },
                data: {
                    lastMessageId: newMessage.id,
                },
            });
        }
    }
    async deleteAll(chatId) {
        await this.prisma.messageStatus.deleteMany({
            where: {
                chatId: chatId,
            },
        });
        return chatId;
    }
    findAll() {
        return `This action returns all messageStatus`;
    }
    findOne(id) {
        return `This action returns a #${id} messageStatus`;
    }
    remove(id) {
        return `This action removes a #${id} messageStatus`;
    }
};
exports.MessageStatusService = MessageStatusService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => message_service_1.MessageService))),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        message_service_1.MessageService])
], MessageStatusService);
//# sourceMappingURL=message_status.service.js.map