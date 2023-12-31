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
exports.GatewayService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const message_service_1 = require("../message/message.service");
const chat_service_1 = require("../chat/chat.service");
const block_user_service_1 = require("../block-user/block-user.service");
const left_chat_service_1 = require("../left-chat/left-chat.service");
const content_img_service_1 = require("../content-img/content-img.service");
const storage_service_1 = require("../storage/storage.service");
const user_service_1 = require("../user/user.service");
const reply_message_service_1 = require("../reply-message/reply-message.service");
const forward_message_service_1 = require("../forward-message/forward-message.service");
const message_status_service_1 = require("../message_status/message_status.service");
let GatewayService = exports.GatewayService = class GatewayService {
    constructor(chat, blockUser, leftChat, prisma, messageS, contentImg, storage, user, replyMessage, forwardMessage, messageStatus) {
        this.chat = chat;
        this.blockUser = blockUser;
        this.leftChat = leftChat;
        this.prisma = prisma;
        this.messageS = messageS;
        this.contentImg = contentImg;
        this.storage = storage;
        this.user = user;
        this.replyMessage = replyMessage;
        this.forwardMessage = forwardMessage;
        this.messageStatus = messageStatus;
    }
    async create(messageCreateDto, server) {
        const message = await this.messageS.createMessage(messageCreateDto);
        await this.messageStatus.createOrEdit(+messageCreateDto.userId, message.id, +messageCreateDto.chatId);
        const newLastMessage = await this.messageS.newLastMessage(message);
        const users = await this.chat.findUsersForChat(+messageCreateDto.chatId);
        for (let i = 0; i < users.length; i++) {
            const countUnreadMessage = await this.messageS.countUnreadMessageOneChat(+messageCreateDto.chatId, users[i].id);
            server.emit(`newMessage${users[i].id}`, {
                countUnreadMessage: countUnreadMessage,
                chatId: messageCreateDto.chatId,
            });
        }
        server.emit(`message${messageCreateDto.chatId}`, message);
        server.emit(`newLastMessage${messageCreateDto.chatId}`, newLastMessage);
        return messageCreateDto.content;
    }
    async createReply(dto, server) {
        const message = await this.messageS.createMessage(dto);
        await this.replyMessage.create({
            messageId: `${message.id}`,
            messageIdWasAnswered: dto.messageIdWasAnswered,
        });
        await this.messageStatus.createOrEdit(+dto.userId, message.id, +dto.chatId);
        const messageWasAnswered = await this.messageS.getMessageWithImg(dto.messageIdWasAnswered);
        const messageWithReply = {
            ...message,
            messageWasAnswered: messageWasAnswered,
        };
        const newLastMessage = await this.messageS.newLastMessage(message);
        const users = await this.chat.findUsersForChat(+dto.chatId);
        for (let i = 0; i < users.length; i++) {
            const countUnreadMessage = await this.messageS.countUnreadMessageOneChat(+dto.chatId, users[i].id);
            server.emit(`newMessage${users[i].id}`, {
                countUnreadMessage: countUnreadMessage,
                chatId: dto.chatId,
            });
        }
        server.emit(`newLastMessage${dto.chatId}`, newLastMessage);
        server.emit(`message${dto.chatId}`, messageWithReply);
    }
    async createReplyWithImg(dto, server) {
        const message = await this.messageS.createMessage(dto);
        await this.messageStatus.createOrEdit(+dto.userId, message.id, +dto.chatId);
        const contentImg = await this.contentImg.createMany(dto.masUrl, message.id);
        const messageWithImg = {
            ...message,
            contentImg: contentImg,
        };
        const messageWasAnswered = await this.messageS.getMessageWithImg(dto.messageIdWasAnswered);
        const messageWithReply = {
            ...messageWithImg,
            messageWasAnswered: messageWasAnswered,
        };
        const newLastMessage = await this.messageS.newLastMessage(messageWithImg);
        const users = await this.chat.findUsersForChat(+dto.chatId);
        for (let i = 0; i < users.length; i++) {
            const countUnreadMessage = await this.messageS.countUnreadMessageOneChat(+dto.chatId, users[i].id);
            server.emit(`newMessage${users[i].id}`, {
                countUnreadMessage: countUnreadMessage,
                chatId: dto.chatId,
            });
        }
        server.emit(`message${dto.chatId}`, messageWithReply);
        server.emit(`newLastMessage${message.chatId}`, newLastMessage);
    }
    async createForwardMessage(dto, server) {
        const message = await this.messageS.createMessage(dto);
        await this.messageStatus.createOrEdit(+dto.userId, message.id, +dto.chatId);
        await this.forwardMessage.create({
            forwardMessagesId: [
                ...dto.forwardMessages.map((oneForwardMessage) => oneForwardMessage.id),
            ],
            messageId: `${message.id}`,
        });
        const forwardMessage = await this.messageS.getMessageWithName(dto.forwardMessages);
        const messageWithAll = {
            ...message,
            forwardMessages: [...forwardMessage],
        };
        const newLastMessage = await this.messageS.newLastMessage(message);
        const users = await this.chat.findUsersForChat(+dto.chatId);
        for (let i = 0; i < users.length; i++) {
            const countUnreadMessage = await this.messageS.countUnreadMessageOneChat(+dto.chatId, users[i].id);
            server.emit(`newMessage${users[i].id}`, {
                countUnreadMessage: countUnreadMessage,
                chatId: dto.chatId,
            });
        }
        server.emit(`newLastMessage${dto.chatId}`, newLastMessage);
        server.emit(`message${dto.chatId}`, messageWithAll);
    }
    async createForwardMessageWithImg(dto, server) {
        const message = await this.messageS.createMessage(dto);
        await this.messageStatus.createOrEdit(+dto.userId, message.id, +dto.chatId);
        await this.forwardMessage.create({
            forwardMessagesId: [
                ...dto.forwardMessages.map((oneForwardMessage) => oneForwardMessage.id),
            ],
            messageId: `${message.id}`,
        });
        const contentImg = await this.contentImg.createMany(dto.masUrl, message.id);
        const messageWithImg = {
            ...message,
            contentImg: contentImg,
        };
        const forwardMessage = await this.messageS.getMessageWithName(dto.forwardMessages);
        const messageWithAll = {
            ...messageWithImg,
            forwardMessages: forwardMessage,
        };
        const newLastMessage = await this.messageS.newLastMessage(messageWithAll);
        const users = await this.chat.findUsersForChat(+dto.chatId);
        for (let i = 0; i < users.length; i++) {
            const countUnreadMessage = await this.messageS.countUnreadMessageOneChat(+dto.chatId, users[i].id);
            server.emit(`newMessage${users[i].id}`, {
                countUnreadMessage: countUnreadMessage,
                chatId: dto.chatId,
            });
        }
        server.emit(`message${message.chatId}`, messageWithAll);
        server.emit(`newLastMessage${message.chatId}`, newLastMessage);
    }
    async deleteMessage(dto, server) {
        await this.messageStatus.editOrDeleteWhenDeleteOneMessage(+dto.userId, +dto.messageId, +dto.chatId);
        const idMessageWasAnswered = await this.replyMessage.remove(dto.messageId);
        const idMessageForward = await this.forwardMessage.remove(dto.messageId);
        const deleteContentImg = await this.contentImg.deleteForMessage(dto.messageId);
        const deleteMessage = await this.messageS.remove(dto.messageId);
        if (deleteContentImg && deleteContentImg.length > 0)
            await this.storage.removeFiles(deleteContentImg.map((oneDeleteContent) => oneDeleteContent.image_url));
        const newLastMessageDelete = await this.messageS.newLastMessageDelete(dto);
        server.emit(`messageDelete${dto.chatId}`, deleteMessage);
        server.emit(`newLastMessage${dto.chatId}`, newLastMessageDelete);
        if (idMessageWasAnswered)
            server.emit(`deleteMessageWasAnswered${dto.chatId}`, idMessageWasAnswered);
        if (idMessageForward)
            server.emit(`deleteForward${dto.chatId}`, idMessageForward);
    }
    async createWithImg(dto, server) {
        const message = await this.messageS.createMessage({
            content: dto.content,
            userId: dto.userId,
            chatId: dto.chatId,
        });
        await this.messageStatus.createOrEdit(+dto.userId, message.id, +dto.chatId);
        const contentImg = await this.contentImg.createMany(dto.masUrl, message.id);
        const messageWithImg = {
            ...message,
            contentImg: contentImg,
        };
        const newLastMessage = await this.messageS.newLastMessage(messageWithImg);
        server.emit(`message${message.chatId}`, messageWithImg);
        server.emit(`newLastMessage${message.chatId}`, newLastMessage);
    }
    async updateMessage(dto, server) {
        const isReplyWasAnswered = await this.replyMessage.isWasAnswered(dto.messageId);
        const updateMessage = await this.messageS.updateMessage(dto);
        const isForwardOrMessage = await this.forwardMessage.isForwardOrMessage(dto.messageId);
        if (isReplyWasAnswered === 'isReply') {
            const messageWasAnswred = await this.replyMessage.findMessageWasAnswered(updateMessage.id);
            const updateMessageReturn = {
                ...updateMessage,
                messageWasAnswered: messageWasAnswred,
            };
            server.emit(`messageUpdate${dto.chatId}`, updateMessageReturn);
        }
        else {
            if (isForwardOrMessage === 'message') {
                const masForwardMessage = await this.forwardMessage.getForwardMessagesForMessage(dto.messageId);
                const updateMessageForward = {
                    ...updateMessage,
                    forwardMessages: masForwardMessage,
                };
                server.emit(`messageUpdate${dto.chatId}`, updateMessageForward);
            }
            else {
                server.emit(`messageUpdate${dto.chatId}`, updateMessage);
            }
        }
        const newLastMessageUpdate = await this.messageS.newLastMessageUpdate(updateMessage, dto.userId);
        if (isReplyWasAnswered === 'wasAnswered') {
            server.emit(`editWasAnswered${dto.chatId}`, updateMessage);
        }
        if (newLastMessageUpdate && Object.keys(newLastMessageUpdate).length !== 0)
            server.emit('newLastMessage', newLastMessageUpdate);
    }
    async editMessageWithImg(dto, server) {
        const isReplyWasAnswered = await this.replyMessage.isWasAnswered(dto.messageId);
        const isForwardOrMessage = await this.forwardMessage.isForwardOrMessage(dto.messageId);
        const updateMessage = await this.messageS.updateMessage(dto);
        const dataDelete = await this.contentImg.deleteContentImgs(dto);
        if (dataDelete)
            await this.storage.removeFiles(dataDelete.map((oneDelete) => oneDelete.image_url));
        await this.contentImg.createContentImgs(dto);
        await this.contentImg.changePlace(dto);
        const allContentImgForMessage = await this.contentImg.findAllForMessage(dto.messageId);
        const updateMessageWithImg = {
            ...updateMessage,
            contentImg: allContentImgForMessage,
        };
        const newLastMessageUpdate = await this.messageS.newLastMessageUpdate(updateMessageWithImg, dto.userId);
        if (newLastMessageUpdate && Object.keys(newLastMessageUpdate).length !== 0)
            server.emit(`newLastMessage${dto.chatId}`, newLastMessageUpdate);
        if (isReplyWasAnswered === 'wasAnswered') {
            server.emit(`editWasAnswered${dto.chatId}`, updateMessageWithImg);
        }
        if (isReplyWasAnswered === 'isReply') {
            const messageWasAnswred = await this.replyMessage.findMessageWasAnswered(updateMessage.id);
            const updateMessageReturn = {
                ...updateMessageWithImg,
                messageWasAnswered: messageWasAnswred,
            };
            server.emit(`messageUpdate${dto.chatId}`, updateMessageReturn);
        }
        else {
            if (isForwardOrMessage === 'message') {
                const masForwardMessage = await this.forwardMessage.getForwardMessagesForMessage(dto.messageId);
                const updateMessageForward = {
                    ...updateMessageWithImg,
                    forwardMessages: masForwardMessage,
                };
                server.emit(`messageUpdate${dto.chatId}`, updateMessageForward);
            }
            else {
                server.emit(`messageUpdate${dto.chatId}`, updateMessageWithImg);
            }
        }
    }
    async createChat(dto, server) {
        const chat = await this.chat.create(dto);
        dto.idUsers.map(async (oneUser) => {
            const chatWithUser = await this.chat.createChatWithUser(chat, oneUser);
            server.emit(`chatCreate${oneUser}`, chatWithUser);
        });
        server.emit(`chatCreate${dto.userWhoCreateId}`, await this.chat.createChatWithUser(chat, dto.userWhoCreateId));
    }
    async deleteChat(id, server) {
        await this.messageStatus.deleteAll(+id);
        const deleteChat = await this.chat.remove(+id);
        deleteChat.userInChat.map((oneUser) => {
            server.emit(`chatDelete${oneUser}`, deleteChat.deleteChat);
        });
    }
    async createBlockUser(dto, server) {
        const blockUser = await this.blockUser.create(dto);
        server.emit(`newBlockedUser${blockUser.user_Who_BlocketId}`, blockUser.user_Who_Was_BlocketId);
        server.emit(`newBlocker${blockUser.user_Who_Was_BlocketId}`, blockUser.user_Who_BlocketId);
    }
    async removeBlockUser(dto, server) {
        const blockUser = await this.blockUser.remove(+dto.idUserWhoBlocked, +dto.idUserWhoWasBlocked);
        if (blockUser) {
            server.emit(`deleteBlockedUser${blockUser.user_Who_BlocketId}`, blockUser.user_Who_Was_BlocketId);
            server.emit(`deleteBlocker${blockUser.user_Who_Was_BlocketId}`, blockUser.user_Who_BlocketId);
        }
    }
    async createLeftChat(dto, server) {
        const leftChat = await this.leftChat.create(dto);
        const messageUser = await this.messageS.messageLeft(dto, true);
        server.emit(`message${leftChat.chatId}`, messageUser.message);
        await this.prisma.userChat.delete({
            where: {
                id: (await this.prisma.userChat.findFirst({
                    where: {
                        userId: leftChat.userId,
                        chatId: leftChat.chatId,
                    },
                })).id,
            },
        });
        server.emit(`newLeftChat${dto.idUsers}`, leftChat.chatId);
        server.emit(`newLeftUserInChat${dto.idChat}`, {
            ...leftChat,
        });
        const lastMessage = await this.messageS.newLastMessage(messageUser.message);
        server.emit(`newLastMessage${dto.idChat}`, lastMessage);
    }
    async removeLeftChat(dto, server) {
        const leftChat = await this.leftChat.delete(dto);
        const messageUser = await this.messageS.messageLeft(dto, false);
        server.emit(`message${leftChat.chatId}`, messageUser.message);
        await this.prisma.userChat.create({
            data: {
                chatId: leftChat.chatId,
                userId: leftChat.userId,
            },
        });
        server.emit(`deleteLeftChat${dto.idUsers}`, leftChat.chatId);
        server.emit(`deleteLeftUserInChat${dto.idChat}`, {
            ...leftChat,
            user: messageUser.user,
        });
        const lastMessage = await this.messageS.newLastMessage(messageUser.message);
        server.emit(`newLastMessage${dto.idChat}`, lastMessage);
    }
    async loadingImg(server) { }
    findAll() {
        return `This action returns all gateway`;
    }
    findOne(id) {
        return `This action returns a #${id} gateway`;
    }
    async joinRoom(room, server) {
        await server.socketsJoin(room.chatId);
    }
    update(id, updateGatewayDto) {
        return `This action updates a #${id} gateway`;
    }
    remove(id) {
        return `This action removes a #${id} gateway`;
    }
};
exports.GatewayService = GatewayService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [chat_service_1.ChatService,
        block_user_service_1.BlockUserService,
        left_chat_service_1.LeftChatService,
        prisma_service_1.PrismaService,
        message_service_1.MessageService,
        content_img_service_1.ContentImgService,
        storage_service_1.StorageService,
        user_service_1.UserService,
        reply_message_service_1.ReplyMessageService,
        forward_message_service_1.ForwardMessageService,
        message_status_service_1.MessageStatusService])
], GatewayService);
//# sourceMappingURL=gateway.service.js.map