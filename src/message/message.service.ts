import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { MessageCreateDto } from './dto/messageCreateDto.dto';
import { ContentImg, LeftChat, Message, User } from '@prisma/client';
import { MessageUpdateDto } from './dto/messageUpdateDto.dto';
import { LeftChatDto } from 'src/left-chat/dto/LeftChat.dto';
import { MessageWithImgDto } from './dto/messageWithImg.dto';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async createMessage(dto: MessageCreateDto) {
    try {
      const message: Message = await this.prisma.message.create({
        data: {
          chatId: +dto.chatId,
          userId: +dto.userId,
          content: dto.content,
        },
      });
      return message;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateMessage(dto: MessageUpdateDto) {
    const upMessage: Message = await this.prisma.message.update({
      where: {
        id: +dto.messageId,
      },
      data: {
        content: dto.content,
      },
    });
    return upMessage;
  }

  async getMessageWithImg(message: Message[]) {
    const contentImgForMessages: ContentImg[] =
      await this.prisma.contentImg.findMany({
        where: {
          messageId: { in: [...message.map((oneMessage) => oneMessage.id)] },
        },
      });
    const messageWithImg: MessageWithImgDto[] = message.map((oneMessage) => {
      return {
        ...oneMessage,
        contentImg: [
          ...contentImgForMessages.filter(
            (oneContentImg) => oneContentImg.messageId === oneMessage.id,
          ),
        ],
      };
    });
    return messageWithImg;
  }

  async getAllForChat(id: string, idUser: string) {
    const leftChat: LeftChat = await this.prisma.leftChat.findFirst({
      where: {
        chatId: +id,
        userId: +idUser,
      },
    });
    const messages: Message[] = await this.prisma.message.findMany({
      where: {
        chatId: +id,
      },
    });
    if (leftChat) {
      const filterMessages: Message[] = messages.filter((one) => {
        return one.createdAt.getTime() <= leftChat.createdAt.getTime() + 60000;
      });
      filterMessages.sort((one, two) => one.id - two.id);
      const messageWithImg: MessageWithImgDto[] = await this.getMessageWithImg(
        filterMessages,
      );
      return messageWithImg;
    }
    messages.sort((one, two) => one.id - two.id);

    const messagesWithImg: MessageWithImgDto[] = await this.getMessageWithImg(
      messages,
    );
    return messagesWithImg;
  }
  async remove(id: string) {
    const message: Message = await this.prisma.message.delete({
      where: {
        id: +id,
      },
    });
    return message;
  }

  async messageLeft(dto: LeftChatDto, flag: boolean) {
    const user: User = await this.prisma.user.findFirst({
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
}
