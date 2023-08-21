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
exports.ReplyMessageService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const message_service_1 = require("../message/message.service");
let ReplyMessageService = exports.ReplyMessageService = class ReplyMessageService {
    constructor(prisma, message) {
        this.prisma = prisma;
        this.message = message;
    }
    async create(dto) {
        const replyMessage = await this.prisma.replyMessage.create({
            data: {
                messageId: +dto.messageId,
                messageIdReply: +dto.messageIdWasAnswered,
            },
        });
        console.log('такое reply создалось = ', replyMessage);
        return 'This action adds a new replyMessage';
    }
    findAll() {
        return `This action returns all replyMessage`;
    }
    findOne(id) {
        return `This action returns a #${id} replyMessage`;
    }
    update(id, updateReplyMessageDto) {
        return `This action updates a #${id} replyMessage`;
    }
    async findMessageWasAnswered(messageId) {
        const messageReply = await this.prisma.replyMessage.findFirst({
            where: {
                messageId: messageId,
            },
        });
        const messageWasAnswered = await this.message.getMessageWithImg(`${messageReply.messageIdReply}`);
        return messageWasAnswered;
    }
    async isWasAnswered(messageId) {
        const messagesReplyWasAnswered = await this.prisma.replyMessage.findMany({
            where: {
                messageIdReply: +messageId,
            },
        });
        const messageIsReply = await this.prisma.replyMessage.findFirst({
            where: {
                messageId: +messageId,
            },
        });
        if (messagesReplyWasAnswered &&
            Object.keys(messagesReplyWasAnswered).length !== 0) {
            return 'wasAnswered';
        }
        else {
            if (messageIsReply && Object.keys(messageIsReply).length !== 0)
                return 'isReply';
            else
                return 'nothing';
        }
    }
    async remove(messageId) {
        const isWasAnswered = await this.isWasAnswered(messageId);
        if (isWasAnswered === 'wasAnswered') {
            await this.prisma.replyMessage.deleteMany({
                where: {
                    messageIdReply: +messageId,
                },
            });
            return messageId;
        }
        else {
            if (isWasAnswered === 'isReply')
                await this.prisma.replyMessage.delete({
                    where: {
                        id: (await this.prisma.replyMessage.findFirst({
                            where: {
                                messageId: +messageId,
                            },
                        })).id,
                    },
                });
        }
    }
};
exports.ReplyMessageService = ReplyMessageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, message_service_1.MessageService])
], ReplyMessageService);
//# sourceMappingURL=reply-message.service.js.map