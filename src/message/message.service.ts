import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { MessageCreateDto } from './dto/messageCreateDto.dto';
import { Message } from '@prisma/client';
import { MessageUpdateDto } from './dto/messageUpdateDto.dto';

interface updateData {
  idMessage: string;
  newContent: string;
}
@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async createMessage(dto: MessageCreateDto) {
    const message: Message = await this.prisma.message.create({
      data: {
        chatId: +dto.chatId,
        userId: +dto.userId,
        content: dto.content,
      },
    });
    return message;
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

  async getAllForChat(id: string) {
    const messages: Message[] = await this.prisma.message.findMany({
      where: {
        chatId: +id,
      },
    });
    messages.sort((one, two) => one.id - two.id);
    return messages;
  }
  async remove(id: string) {
    const message: Message = await this.prisma.message.delete({
      where: {
        id: +id,
      },
    });
    return message;
  }
}
