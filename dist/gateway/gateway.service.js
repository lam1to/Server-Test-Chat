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
let GatewayService = exports.GatewayService = class GatewayService {
    constructor(chat, blockUser, leftChat, prisma, messageS, contentImg, storage) {
        this.chat = chat;
        this.blockUser = blockUser;
        this.leftChat = leftChat;
        this.prisma = prisma;
        this.messageS = messageS;
        this.contentImg = contentImg;
        this.storage = storage;
    }
    async create(messageCreateDto, server) {
        const message = await this.messageS.createMessage(messageCreateDto);
        server.emit(`message${messageCreateDto.chatId}`, message);
        return messageCreateDto.content;
    }
    async createWithImg(dto, server) {
        const message = await this.messageS.createMessage({
            content: dto.content,
            userId: dto.userId,
            chatId: dto.chatId,
        });
        const contentImg = await this.contentImg.createMany(dto.masUrl, message.id);
        const messageWithImg = {
            ...message,
            contentImg: contentImg,
        };
        server.emit(`message${message.chatId}`, messageWithImg);
    }
    async editMessageWithImg(dto, server) {
        const updateMessage = await this.messageS.updateMessage(dto);
        const dataDelete = await this.contentImg.deleteContentImgs(dto);
        await this.storage.removeFiles(dataDelete.map((oneDelete) => oneDelete.image_url));
        await this.contentImg.createContentImgs(dto);
        const allContentImgForMessage = await this.contentImg.findAllForMessage(dto.messageId);
        const updateMessageWithImg = {
            ...updateMessage,
            contentImg: allContentImgForMessage,
        };
        server.emit(`messageUpdate${dto.chatId}`, updateMessageWithImg);
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
        const deleteChat = await this.chat.remove(+id);
        deleteChat.userInChat.map((oneUser) => {
            server.emit(`chatDelete${oneUser}`, deleteChat.deleteChat);
        });
    }
    async deleteMessage(dto, server) {
        const deleteContentImg = await this.contentImg.deleteForMessage(dto.messageId);
        const deleteMessage = await this.messageS.remove(dto.messageId);
        if (deleteContentImg.length > 0)
            await this.storage.removeFiles(deleteContentImg.map((oneDeleteContent) => oneDeleteContent.image_url));
        server.emit(`messageDelete${dto.chatId}`, deleteMessage);
    }
    async updateMessage(dto, server) {
        const updateMessage = await this.messageS.updateMessage(dto);
        server.emit(`messageUpdate${dto.chatId}`, updateMessage);
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
        storage_service_1.StorageService])
], GatewayService);
//# sourceMappingURL=gateway.service.js.map