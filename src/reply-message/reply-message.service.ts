import { Injectable } from '@nestjs/common';
import { CreateReplyMessageDto } from './dto/create-reply-message.dto';
import { UpdateReplyMessageDto } from './dto/update-reply-message.dto';
import { ReplyMessage } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { MessageDto } from 'src/message/dto/messageDto.dto';
import { MessageWithImgDto } from 'src/message/dto/messageWithImg.dto';
import { MessageService } from 'src/message/message.service';

@Injectable()
export class ReplyMessageService {
  constructor(private prisma: PrismaService, private message: MessageService) {}
  async create(dto: CreateReplyMessageDto) {
    const replyMessage: ReplyMessage = await this.prisma.replyMessage.create({
      data: {
        messageId: +dto.messageId,
        messageIdReply: +dto.messageIdWasAnswered,
      },
    });
    console.log('такое reply создалось = ', replyMessage);
    return 'This action adds a new replyMessage';
  }

  findAll() {
    return `This action returns all replyMessage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} replyMessage`;
  }

  update(id: number, updateReplyMessageDto: UpdateReplyMessageDto) {
    return `This action updates a #${id} replyMessage`;
  }

  async findMessageWasAnswered(messageId: number) {
    const messageReply: ReplyMessage = await this.prisma.replyMessage.findFirst(
      {
        where: {
          messageId: messageId,
        },
      },
    );
    const messageWasAnswered: MessageWithImgDto =
      await this.message.getMessageWithImg(`${messageReply.messageIdReply}`);
    
    return messageWasAnswered;
  }

  async isWasAnswered(messageId: string) {
    const messagesReplyWasAnswered: ReplyMessage[] =
      await this.prisma.replyMessage.findMany({
        where: {
          messageIdReply: +messageId,
        },
      });
    const messageIsReply: ReplyMessage =
      await this.prisma.replyMessage.findFirst({
        where: {
          messageId: +messageId,
        },
      });
    if (
      messagesReplyWasAnswered &&
      Object.keys(messagesReplyWasAnswered).length !== 0
    ) {
      return 'wasAnswered';
    } else {
      if (messageIsReply && Object.keys(messageIsReply).length !== 0)
        return 'isReply';
      else return 'nothing';
    }
  }

  async remove(messageId: string) {
    const isWasAnswered: string = await this.isWasAnswered(messageId);
    if (isWasAnswered === 'wasAnswered') {
      await this.prisma.replyMessage.deleteMany({
        where: {
          messageIdReply: +messageId,
        },
      });
      return messageId;
    } else {
      if (isWasAnswered === 'isReply')
        await this.prisma.replyMessage.delete({
          where: {
            id: (
              await this.prisma.replyMessage.findFirst({
                where: {
                  messageId: +messageId,
                },
              })
            ).id,
          },
        });
    }
    // return `This action removes a #${id} replyMessage`;
  }
}
