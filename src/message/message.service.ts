import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { MessageCreateDto } from './dto/messageCreateDto.dto';
import { ContentImg, LeftChat, Message, User } from '@prisma/client';
import { MessageUpdateDto } from './dto/messageUpdateDto.dto';
import { LeftChatDto } from 'src/left-chat/dto/LeftChat.dto';
import { CreateStorageUrlImg } from 'src/storage/dto/createStorageUrlImg.dto';
import { StorageService } from 'src/storage/storage.service';
import { ContentImgService } from 'src/content-img/content-img.service';
import { GatewayGateway } from 'src/gateway/gateway.gateway';
import { error } from 'console';
import { MessageWithImgDto } from './dto/messageWithImg.dto';

interface updateData {
  idMessage: string;
  newContent: string;
}
@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async createMessage(dto: MessageCreateDto) {
    console.log('зашли в обычное создание');
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

  async createMessageWithImg(
    dto: MessageCreateDto,
    files: Express.Multer.File[],
    gateway: GatewayGateway,
    storage: StorageService,
    contentImg: ContentImgService,
  ) {
    console.log('file = ', files);
    console.log('message = ', dto);
    const imgUrl: CreateStorageUrlImg[] = await storage.uploadFile(files);
    console.log('imgUrl mas = ', imgUrl);
    const message: Message = await this.createMessage(dto);
    console.log('message create = ', message);
    const createContentImg: ContentImg[] = await contentImg.create(
      imgUrl,
      message.id,
    );
    console.log('contentImg = ', createContentImg);
    gateway.createWithImg(message, createContentImg);
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
      return filterMessages;
    }
    messages.sort((one, two) => one.id - two.id);
    const contentImg: ContentImg[] = await this.prisma.contentImg.findMany({
      where: {
        messageId: { in: messages.map((oneMessage) => oneMessage.id) },
      },
    });
    console.log('contentImg = ', contentImg);
    const messagesWithImg: MessageWithImgDto[] = messages.map((oneMessage) => {
      return {
        ...oneMessage,
        contentImg: contentImg.filter(
          (oneContentImg) => oneContentImg.messageId === oneMessage.id,
        ),
      };
    });
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
