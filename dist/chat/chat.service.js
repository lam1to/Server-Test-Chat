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
    async createChatWithUser(chat, idUser) {
        const userChat = await this.prisma.userChat.findMany({
            where: {
                chatId: chat.id,
                userId: {
                    not: +idUser,
                },
            },
        });
        const users = await this.prisma.user.findMany({
            where: {
                id: { in: userChat.map((one) => +one.userId) },
            },
        });
        const chatWithUser = {
            ...chat,
            users: userChat
                .map((oneUserChat) => ({
                ...oneUserChat,
                users: users.filter((oneUser) => {
                    if (oneUser.id === oneUserChat.userId)
                        return oneUser;
                }),
            }))
                ?.filter((oneUserChat) => {
                return chat.id === oneUserChat.chatId;
            })
                .map((one) => one.users[0]),
        };
        return chatWithUser;
    }
    async create(createChatDto) {
        firstif: if (createChatDto.userWhoCreateId &&
            createChatDto.idUsers.length + 1 == 2) {
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
                const chat = await this.prisma.chat.findUnique({
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
        const isDbGroup = createChatDto.userWhoCreateId && createChatDto.idUsers.length + 1 == 2
            ? 'DM'
            : 'GroupM';
        const nameChat = isDbGroup === 'DM'
            ? (await this.prisma.user.findUnique({
                where: {
                    id: +createChatDto.idUsers[0],
                },
            })).name
            : createChatDto.name;
        const chat = await this.prisma.chat.create({
            data: {
                type: isDbGroup,
                userWhoCreateId: +createChatDto.userWhoCreateId,
                name: nameChat,
            },
        });
        const createUserChat = await this.prisma.userChat.createMany({
            data: [
                ...createChatDto.idUsers.map((oneUserId) => {
                    return { userId: +oneUserId, chatId: chat.id };
                }),
                { userId: +createChatDto.userWhoCreateId, chatId: chat.id },
            ],
        });
        return chat;
    }
    async findAll(idUsers) {
        const masTest = [
            ...(await this.prisma.userChat.findMany({
                where: {
                    userId: +idUsers,
                },
            })),
            ...(await this.prisma.leftChat.findMany({
                where: {
                    userId: +idUsers,
                },
            })),
        ];
        const chats = await this.prisma.chat.findMany({
            where: {
                id: {
                    in: [
                        ...(await this.prisma.userChat.findMany({
                            where: {
                                userId: +idUsers,
                            },
                        })),
                        ...(await this.prisma.leftChat.findMany({
                            where: {
                                userId: +idUsers,
                            },
                        })),
                    ].map((item) => {
                        return +item.chatId;
                    }),
                },
            },
        });
        const userChat = await this.prisma.userChat.findMany({
            where: {
                OR: {
                    chatId: { in: chats.map((one) => +one.id) },
                    userId: { not: +idUsers },
                },
            },
        });
        const users = await this.prisma.user.findMany({
            where: {
                id: { in: userChat.map((one) => +one.userId) },
            },
        });
        const allChat = chats.map((oneChat) => ({
            ...oneChat,
            users: userChat
                .map((oneUserChat) => ({
                ...oneUserChat,
                users: users.filter((oneUser) => {
                    if (oneUser.id === oneUserChat.userId)
                        return oneUser;
                }),
            }))
                ?.filter((oneUserChat) => {
                return oneChat.id === oneUserChat.chatId;
            })
                .map((one) => one.users[0]),
        }));
        return allChat;
    }
    async remove(id) {
        console.log('prislo');
        const usersWhoInChat = await this.prisma.userChat.findMany({
            where: {
                chatId: id,
            },
        });
        const deleteMessage = await this.prisma.message.deleteMany({
            where: {
                chatId: id,
            },
        });
        const deleteUserChat = await this.prisma.userChat.deleteMany({
            where: {
                id: {
                    in: usersWhoInChat.map((one) => {
                        return one.id;
                    }),
                },
            },
        });
        const deleteChat = await this.prisma.chat.delete({
            where: {
                id: id,
            },
        });
        return {
            deleteChat: deleteChat,
            userInChat: usersWhoInChat.map((oneUserChat) => {
                return oneUserChat.userId;
            }),
        };
    }
};
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChatService);
//# sourceMappingURL=chat.service.js.map