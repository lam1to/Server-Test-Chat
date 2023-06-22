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
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ChatService = exports.ChatService = class ChatService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createChatDto) {
        firstif: if (createChatDto.idUsers.length == 2) {
            const chatUsers = await this.prisma.userChat.findMany({
                where: {
                    userId: { in: createChatDto.idUsers.map(Number) },
                    chatId: {
                        in: (await this.prisma.chat.findMany({
                            where: {
                                type: 'DM',
                            },
                        })).map((item) => {
                            return +item.id;
                        }),
                    },
                },
            });
            const chatId = chatUsers.find((nnn, index) => {
                return chatUsers.find((x, ind) => x.chatId === nnn.chatId && index !== ind);
            });
            if (chatId !== undefined) {
                const chat = this.prisma.chat.findUnique({
                    where: {
                        id: chatId.chatId,
                    },
                });
                return chat;
            }
            else {
                break firstif;
            }
        }
        const isDbGroup = createChatDto.idUsers.length == 2 ? 'DM' : 'GroupM';
        const chat = await this.prisma.chat.create({
            data: {
                type: isDbGroup,
            },
        });
        const mas = createChatDto.idUsers.map(async (id, i) => {
            await this.prisma.userChat.create({
                data: {
                    userId: +id,
                    chatId: chat.id,
                },
            });
        });
        return chat;
    }
    async findAll(dto) {
        const chats = await this.prisma.chat.findMany({
            where: {
                id: {
                    in: (await this.prisma.userChat.findMany({
                        where: {
                            userId: +dto.idUser,
                        },
                    })).map((item) => {
                        return +item.chatId;
                    }),
                },
            },
        });
        return chats;
    }
    async remove(id) {
        const deleteChat = await this.prisma.chat.delete({
            where: {
                id: id,
            },
        });
        return deleteChat;
    }
};
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChatService);
//# sourceMappingURL=chat.service.js.map