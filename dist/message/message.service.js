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
const chat_service_1 = require("../chat/chat.service");
const user_service_1 = require("../user/user.service");
let MessageService = exports.MessageService = class MessageService {
    constructor(prisma, chat, user) {
        this.prisma = prisma;
        this.chat = chat;
        this.user = user;
    }
    async createMessage(dto) {
        try {
            const message = await this.prisma.message.create({
                data: {
                    chatId: +dto.chatId,
                    userId: +dto.userId,
                    content: dto.content,
                },
            });
            return message;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getMessageWithName(message) {
        const users = await this.prisma.user.findMany({
            where: {
                id: { in: [...message.map((oneMessage) => +oneMessage.userId)] },
            },
        });
        const messageWithAllName = message.map((oneMessage) => {
            return {
                ...oneMessage,
                name: users.filter((oneUser) => oneUser.id === +oneMessage.userId)[0]
                    .name,
            };
        });
        return messageWithAllName;
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
    async getMessageWithImg(idMessage) {
        const message = await this.prisma.message.findFirst({
            where: {
                id: +idMessage,
            },
        });
        const contentImgForMessages = await this.prisma.contentImg.findMany({
            where: {
                messageId: message.id,
            },
        });
        const messageWithImg = {
            ...message,
            contentImg: [
                ...contentImgForMessages.filter((oneContentImg) => oneContentImg.messageId === message.id),
            ],
        };
        return messageWithImg;
    }
    async getMessageWithImgReply(idMessage) {
        const messageWithImg = await this.getMessageWithImg(idMessage);
        const replyMessage = await this.prisma.replyMessage.findFirst({
            where: {
                messageId: messageWithImg.id,
            },
        });
        if (replyMessage && Object.keys(replyMessage).length !== 0) {
            const messageWithReplyImg = {
                ...messageWithImg,
                messageWasAnswered: await this.getMessageWithImg(`${replyMessage.messageIdReply}`),
            };
            return messageWithReplyImg;
        }
        else
            return messageWithImg;
    }
    async getMessagesWithImg(message) {
        const contentImgForMessages = await this.prisma.contentImg.findMany({
            where: {
                messageId: { in: [...message.map((oneMessage) => oneMessage.id)] },
            },
        });
        const messageWithImg = message.map((oneMessage) => {
            return {
                ...oneMessage,
                contentImg: [
                    ...contentImgForMessages.filter((oneContentImg) => oneContentImg.messageId === oneMessage.id),
                ],
            };
        });
        return messageWithImg;
    }
    async getMessageForward(message) {
        const forwardData = await this.prisma.forwardMessage.findMany({
            where: {
                messageId: { in: [...message.map((oneMessage) => oneMessage.id)] },
            },
        });
        let messagesReturn = [];
        for (let i = 0; i < message.length; i++) {
            const forward = forwardData.filter((oneForward) => oneForward.messageId === message[i].id);
            let masForward = [];
            if (forward && Object.keys(forward).length !== 0) {
                for (let j = 0; j < forward.length; j++) {
                    const forwardMessage = await this.getMessageWithImgReply(`${forward[j].messageIdForward}`);
                    masForward[j] = {
                        ...forwardMessage,
                        name: (await this.prisma.user.findFirst({
                            where: {
                                id: forwardMessage.userId,
                            },
                        })).name,
                    };
                }
            }
            messagesReturn[i] = { ...message[i], forwardMessages: masForward };
            masForward = [];
        }
        return messagesReturn;
    }
    async getMessageWithReply(allMessageForChat) {
        const replyMessage = await this.prisma.replyMessage.findMany({
            where: {
                messageId: {
                    in: [...allMessageForChat.map((oneMessage) => oneMessage.id)],
                },
            },
        });
        const MessageIdWithMessage = allMessageForChat
            .map((oneMessage) => {
            const test = replyMessage.filter((oneReply) => oneReply.messageId === oneMessage.id)[0];
            if (test && Object.keys(test).length !== 0) {
                const idMessageSearch = test.messageIdReply;
                return {
                    messageId: oneMessage.id,
                    messageReply: allMessageForChat.filter((oneMessage2) => oneMessage2.id == idMessageSearch)[0],
                };
            }
        })
            .filter((oneItem) => oneItem !== undefined);
        const messageWithReplyImg = allMessageForChat.map((oneMessage) => {
            const messageReply = MessageIdWithMessage.filter((oneItem) => oneItem.messageId === oneMessage.id)[0];
            if (messageReply && messageReply.messageReply) {
                return {
                    ...oneMessage,
                    messageWasAnswered: messageReply.messageReply,
                };
            }
            else {
                return oneMessage;
            }
        });
        return messageWithReplyImg;
    }
    async getAllForChat(id, idUser) {
        const leftChat = await this.prisma.leftChat.findFirst({
            where: {
                chatId: +id,
                userId: +idUser,
            },
        });
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
            const messageWithImg = await this.getMessagesWithImg(filterMessages);
            const messagesWithImgMessage = await this.getMessageWithReply(filterMessages);
            const returnMessage = await this.getMessageForward(messagesWithImgMessage);
            return returnMessage;
        }
        messages.sort((one, two) => one.id - two.id);
        const messagesWithImg = await this.getMessagesWithImg(messages);
        const messagesWithImgMessage = await this.getMessageWithReply(messagesWithImg);
        const returnMessage = await this.getMessageForward(messagesWithImgMessage);
        return returnMessage;
    }
    getPart(messages, allPart, idPart, limitCount) {
        if (+limitCount >= messages.length) {
            return messages;
        }
        else {
            if (idPart == allPart) {
                return messages.slice(0, messages.length - +limitCount * (+idPart - 1));
            }
            else {
                return messages.slice(messages.length - +limitCount * +idPart, messages.length - +limitCount * (+idPart - 1));
            }
        }
    }
    async getOnePartMessage(limitCount, chatId, partId, idUser) {
        const allMessageForChat = await this.getAllForChat(chatId, idUser);
        const allPart = `${Math.ceil(allMessageForChat.length / +limitCount)}`;
        const messagesPart = this.getPart(allMessageForChat, allPart, partId, limitCount);
        const messagesPartReturn = {
            messages: messagesPart,
            allPart: allPart,
        };
        return messagesPartReturn;
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
    async newLastMessageUpdate(updateMessage, userId) {
        const allMessage = await this.getAllForChat(`${updateMessage.chatId}`, userId);
        if (allMessage[allMessage.length - 1].id === updateMessage.id) {
            const lastMessage = allMessage[allMessage.length - 1];
            const lastMessageWithName = {
                ...lastMessage,
                name: (await this.user.getUserId({
                    id: `${lastMessage.userId}`,
                })).name,
            };
            return lastMessageWithName;
        }
    }
    async newLastMessageDelete(dto) {
        const allMessage = await this.getAllForChat(dto.chatId, dto.userId);
        if (allMessage.length !== 0) {
            const lastMessage = allMessage[allMessage.length - 1];
            const lastMessageWithName = {
                ...lastMessage,
                name: (await this.user.getUserId({
                    id: `${lastMessage.userId}`,
                })).name,
            };
            return lastMessageWithName;
        }
        return {
            chatId: dto.chatId,
            id: '0',
            name: '',
            content: '',
            userId: '0',
            createdAt: Date.now(),
        };
    }
    async newLastMessage(message) {
        const newLastMessage = {
            ...message,
            name: (await this.user.getUserId({
                id: `${message.userId}`,
            })).name,
        };
        return newLastMessage;
    }
    async getLastMessage(id) {
        const allChatForUser = await this.chat.getAllChatForUser(id);
        let lastMessage = [];
        for (let i = 0; i < allChatForUser.length; i++) {
            const messgeForChat = await this.getAllForChat(`${allChatForUser[i].id}`, id);
            if (messgeForChat)
                lastMessage = [...lastMessage, messgeForChat[messgeForChat.length - 1]];
        }
        if (lastMessage) {
            let lastMessageWithName = [];
            for (let i = 0; i < lastMessage.length; i++) {
                if (lastMessage[i] && lastMessage[i].userId) {
                    const user = await this.user.getUserId({
                        id: `${lastMessage[i].userId}`,
                    });
                    if (user)
                        lastMessageWithName = [
                            ...lastMessageWithName,
                            {
                                ...lastMessage[i],
                                name: user.name,
                            },
                        ];
                }
            }
            if (lastMessageWithName)
                return lastMessageWithName;
        }
    }
};
exports.MessageService = MessageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        chat_service_1.ChatService,
        user_service_1.UserService])
], MessageService);
//# sourceMappingURL=message.service.js.map