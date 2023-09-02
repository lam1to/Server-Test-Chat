import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateChatDto } from './dto/createChat.dto';
import { PrismaService } from 'src/prisma.service';
import { Chat, UserChat, User } from '@prisma/client';
import { MessageService } from 'src/message/message.service';
import { MessageStatusService } from 'src/message_status/message_status.service';
export interface IForAllChat {
  id: number;
  type: string;
  createdAt: Date;
  users: User[] | undefined;
  countUnreadMessage: number;
}
@Injectable()
export class ChatService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => MessageService))
    private message: MessageService,
    @Inject(forwardRef(() => MessageStatusService))
    private messageStaus: MessageStatusService,
  ) {}

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
      countUnreadMessage: 0,
    };
    return chatWithUser;
  }

  async create(createChatDto: CreateChatDto) {
    firstif: if (
      createChatDto.userWhoCreateId &&
      createChatDto.idUsers.length + 1 == 2
    ) {
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
      createChatDto.userWhoCreateId && createChatDto.idUsers.length + 1 == 2
        ? 'DM'
        : 'GroupM';
    const nameChat: string =
      isDbGroup === 'DM'
        ? (
            await this.prisma.user.findUnique({
              where: {
                id: +createChatDto.idUsers[0],
              },
            })
          ).name
        : createChatDto.name;
    const chat: Chat = await this.prisma.chat.create({
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

  async findAll(idUsers: string) {
    const chats: Chat[] = await this.getAllChatForUser(idUsers);
    const userChat: UserChat[] = await this.prisma.userChat.findMany({
      where: {
        OR: {
          chatId: { in: chats.map((one) => +one.id) },
          userId: { not: +idUsers },
        },
      },
    });
    const users: User[] = await this.prisma.user.findMany({
      where: {
        id: { in: userChat.map((one) => +one.userId) },
      },
    });

    let allChat: IForAllChat[] = [] as IForAllChat[];
    for (let i = 0; i < chats.length; i++) {
      allChat[i] = {
        ...chats[i],
        users: userChat
          .map((oneUserChat) => ({
            ...oneUserChat,
            users: users.filter((oneUser) => {
              if (oneUser.id === oneUserChat.userId) return oneUser;
            }),
          }))
          ?.filter((oneUserChat) => {
            return chats[i].id === oneUserChat.chatId;
          })
          .map((one) => one.users[0]),
        // countUnreadMessage: 0,
        countUnreadMessage: await this.message.countUnreadMessageOneChat(
          chats[i].id,
          +idUsers,
        ),
      };
    }
    // const allChat: IForAllChat[] | undefined = chats.map((oneChat) => ({
    //   ...oneChat,
    //   users: userChat
    //     .map((oneUserChat) => ({
    //       ...oneUserChat,
    //       users: users.filter((oneUser) => {
    //         if (oneUser.id === oneUserChat.userId) return oneUser;
    //       }),
    //     }))
    //     ?.filter((oneUserChat) => {
    //       return oneChat.id === oneUserChat.chatId;
    //     })
    //     .map((one) => one.users[0]),
    //   countUnreadMessage: this.message.countUnreadMessageOneChat(
    //     oneChat.id,
    //     +idUsers,
    //   ),
    // }));

    return allChat;
  }

  async getAllChatForUser(id: string) {
    const chats: Chat[] = await this.prisma.chat.findMany({
      where: {
        id: {
          in: [
            ...(await this.prisma.userChat.findMany({
              where: {
                userId: +id,
              },
            })),
            ...(await this.prisma.leftChat.findMany({
              where: {
                userId: +id,
              },
            })),
          ].map((item) => {
            return +item.chatId;
          }),
        },
      },
    });
    if (chats) return chats;
  }

  async findUsersForChat(chatId: number) {
    const userChat: UserChat[] = await this.prisma.userChat.findMany({
      where: {
        OR: {
          chatId: chatId,
        },
      },
    });
    const users: User[] = await this.prisma.user.findMany({
      where: {
        id: { in: userChat.map((one) => +one.userId) },
      },
    });
    return users;
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
