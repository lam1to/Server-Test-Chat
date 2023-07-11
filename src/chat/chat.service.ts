import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/createChat.dto';
import { PrismaService } from 'src/prisma.service';
import { Chat, UserChat, User } from '@prisma/client';
export interface IForAllChat {
  id: number;
  type: string;
  createdAt: Date;
  users: User[] | undefined;
}
@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async createChatWithUser(chat: Chat, idUser: string) {
    const userChat: UserChat[] = await this.prisma.userChat.findMany({
      where: {
        chatId: chat.id,
        userId: {
          not: +idUser,
        },
      },
    });
    const users: User[] = await this.prisma.user.findMany({
      where: {
        id: { in: userChat.map((one) => +one.userId) },
      },
    });
    const chatWithUser: IForAllChat = {
      ...chat,
      users: userChat
        .map((oneUserChat) => ({
          ...oneUserChat,
          users: users.filter((oneUser) => {
            if (oneUser.id === oneUserChat.userId) return oneUser;
          }),
        }))
        ?.filter((oneUserChat) => {
          return chat.id === oneUserChat.chatId;
        })
        .map((one) => one.users[0]),
    };
    return chatWithUser;
  }

  async create(createChatDto: CreateChatDto) {
    firstif: if (createChatDto.idUsers.length == 2) {
      const chatUsers: UserChat[] = await this.prisma.userChat.findMany({
        where: {
          userId: { in: createChatDto.idUsers.map(Number) },
          chatId: {
            in: (
              await this.prisma.chat.findMany({
                where: {
                  type: 'DM',
                },
              })
            ).map((item) => {
              return +item.id;
            }),
          },
        },
      });
      const chatId = chatUsers.find((nnn, index) => {
        return chatUsers.find(
          (x, ind) => x.chatId === nnn.chatId && index !== ind,
        );
      });
      if (chatId !== undefined) {
        const chat: Chat = await this.prisma.chat.findUnique({
          where: {
            id: chatId.chatId,
          },
        });
        return chat;
      } else {
        break firstif;
      }
    }
    const isDbGroup: string =
      createChatDto.idUsers.length == 2 ? 'DM' : 'GroupM';
    const chat: Chat = await this.prisma.chat.create({
      data: {
        type: isDbGroup,
      },
    });
    const createUserChat = await this.prisma.userChat.createMany({
      data: [
        ...createChatDto.idUsers.map((oneUserId) => {
          return { userId: +oneUserId, chatId: chat.id };
        }),
      ],
    });
    return chat;
  }

  async findAll(idUsers: string) {
    const chats: Chat[] = await this.prisma.chat.findMany({
      where: {
        id: {
          in: (
            await this.prisma.userChat.findMany({
              where: {
                userId: +idUsers,
              },
            })
          ).map((item) => {
            return +item.chatId;
          }),
        },
      },
    });
    const userChat: UserChat[] = await this.prisma.userChat.findMany({
      where: {
        chatId: { in: chats.map((one) => +one.id) },
        userId: { not: +idUsers },
      },
    });
    const users: User[] = await this.prisma.user.findMany({
      where: {
        id: { in: userChat.map((one) => +one.userId) },
      },
    });

    const allChat: IForAllChat[] | undefined = chats.map((oneChat) => ({
      ...oneChat,
      users: userChat
        .map((oneUserChat) => ({
          ...oneUserChat,
          users: users.filter((oneUser) => {
            if (oneUser.id === oneUserChat.userId) return oneUser;
          }),
        }))
        ?.filter((oneUserChat) => {
          return oneChat.id === oneUserChat.chatId;
        })
        .map((one) => one.users[0]),
    }));

    return allChat;
  }

  async remove(id: number) {
    console.log('prislo');
    const usersWhoInChat: UserChat[] = await this.prisma.userChat.findMany({
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
}
