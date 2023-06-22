import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/createChat.dto';
import { PrismaService } from 'src/prisma.service';
import { Chat, UserChat } from '@prisma/client';
import { async } from 'rxjs';
import { FindChatDto } from './dto/findDto.dto';
@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

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
        const chat = this.prisma.chat.findUnique({
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

  async findAll(dto: FindChatDto) {
    const chats: Chat[] = await this.prisma.chat.findMany({
      where: {
        id: {
          in: (
            await this.prisma.userChat.findMany({
              where: {
                userId: +dto.idUser,
              },
            })
          ).map((item) => {
            return +item.chatId;
          }),
        },
      },
    });
    return chats;
  }
  async remove(id: number) {
    const deleteChat = await this.prisma.chat.delete({
      where: {
        id: id,
      },
    });
    return deleteChat;
  }
}
