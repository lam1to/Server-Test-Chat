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
exports.ForwardMessageService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const message_service_1 = require("../message/message.service");
let ForwardMessageService = exports.ForwardMessageService = class ForwardMessageService {
    constructor(prisma, message) {
        this.prisma = prisma;
        this.message = message;
    }
    async create(dto) {
        if (dto.forwardMessagesId.length !== 0 && dto.messageId)
            await this.prisma.forwardMessage.createMany({
                data: [
                    ...dto.forwardMessagesId.map((oneForwardId) => {
                        return {
                            messageId: +dto.messageId,
                            messageIdForward: +oneForwardId,
                        };
                    }),
                ],
            });
        return 'This action adds a new forwardMessage';
    }
    async getForwardMessagesForMessage(idMessage) {
        const forwardData = await this.prisma.forwardMessage.findMany({
            where: {
                messageId: +idMessage,
            },
        });
        if (forwardData && Object.keys(forwardData).length !== 0) {
            let masForwardMessage = [];
            for (let i = 0; i < forwardData.length; i++) {
                const forwardMessage = await this.message.getMessageWithImgReply(`${forwardData[i].messageIdForward}`);
                masForwardMessage[i] = {
                    ...forwardMessage,
                    name: (await this.prisma.user.findFirst({
                        where: {
                            id: forwardMessage.userId,
                        },
                    })).name,
                };
            }
            return masForwardMessage;
        }
    }
    async isForwardOrMessage(messageId) {
        const message = await this.prisma.forwardMessage.findMany({
            where: {
                messageId: +messageId,
            },
        });
        const forwardMessage = await this.prisma.forwardMessage.findMany({
            where: {
                messageIdForward: +messageId,
            },
        });
        if (message && Object.keys(message).length !== 0) {
            return 'message';
        }
        else {
            if (forwardMessage && Object.keys(forwardMessage).length !== 0)
                return 'forward';
            else
                return 'nothing';
        }
    }
    async remove(messageId) {
        const isForwardOrMessage = await this.isForwardOrMessage(messageId);
        if (isForwardOrMessage == 'message') {
            await this.prisma.forwardMessage.deleteMany({
                where: {
                    id: {
                        in: [
                            ...(await this.prisma.forwardMessage.findMany({
                                where: {
                                    messageId: +messageId,
                                },
                            })).map((oneItem) => oneItem.id),
                        ],
                    },
                },
            });
        }
        else {
            if (isForwardOrMessage == 'forward') {
                await this.prisma.forwardMessage.deleteMany({
                    where: {
                        messageIdForward: +messageId,
                    },
                });
                return messageId;
            }
        }
    }
    findAll() {
        return `This action returns all forwardMessage`;
    }
    findOne(id) {
        return `This action returns a #${id} forwardMessage`;
    }
    update(id, updateForwardMessageDto) {
        return `This action updates a #${id} forwardMessage`;
    }
};
exports.ForwardMessageService = ForwardMessageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, message_service_1.MessageService])
], ForwardMessageService);
//# sourceMappingURL=forward-message.service.js.map