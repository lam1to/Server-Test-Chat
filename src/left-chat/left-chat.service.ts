import { Injectable } from '@nestjs/common';
import { LeftChat, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { LeftChatDto } from './dto/LeftChat.dto';

@Injectable()
export class LeftChatService {
  constructor(private prisma: PrismaService) {}

  async create(dto: LeftChatDto) {
    const leftChat: LeftChat = await this.prisma.leftChat.findFirst({
      where: {
        userId: +dto.idUsers,
        chatId: +dto.idChat,
      },
    });
    if (!leftChat) {
      const createleftChat: LeftChat = await this.prisma.leftChat.create({
        data: {
          userId: +dto.idUsers,
          chatId: +dto.idChat,
        },
      });
      return createleftChat;
    }
    return leftChat;
  }
  async delete(dto: LeftChatDto) {
    const leftChat: LeftChat = await this.prisma.leftChat.findFirst({
      where: {
        userId: +dto.idUsers,
        chatId: +dto.idChat,
      },
    });
    if (leftChat) {
      const deleteLeftChat: LeftChat = await this.prisma.leftChat.delete({
        where: {
          id: (
            await this.prisma.leftChat.findFirst({
              where: {
                userId: +dto.idUsers,
                chatId: +dto.idChat,
              },
            })
          ).id,
        },
      });
      return deleteLeftChat;
    }
    return leftChat;
  }
  async findAll(id: string) {
    const allLeftChat: LeftChat[] = await this.prisma.leftChat.findMany({
      where: {
        userId: +id,
      },
    });
    return allLeftChat.map((one) => one.chatId);
  }
}
