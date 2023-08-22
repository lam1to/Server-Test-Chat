import { Injectable } from '@nestjs/common';
import { CreateForwardMessageDto } from './dto/create-forward-message.dto';
import { UpdateForwardMessageDto } from './dto/update-forward-message.dto';
import { PrismaService } from 'src/prisma.service';
import { ForwardMessage } from '@prisma/client';
import { el } from '@faker-js/faker';
import { MessageService } from 'src/message/message.service';
import {
  MessageWithImgMessage,
  MessageWithImgMessageName,
} from 'src/message/dto/messageWithImg.dto';

@Injectable()
export class ForwardMessageService {
  constructor(private prisma: PrismaService, private message: MessageService) {}
  async create(dto: CreateForwardMessageDto) {
    if (dto.forwardMessagesId.length !== 0 && dto.messageId)
      await this.prisma.forwardMessage.createMany({
        data: [
          ...dto.forwardMessagesId.map((oneForwardId) => {
            return {
              messageId: +dto.messageId,
              messageIdForward: +oneForwardId,
            };
          }),
        ],
      });
    return 'This action adds a new forwardMessage';
  }

  async getForwardMessagesForMessage(idMessage: string) {
    const forwardData: ForwardMessage[] =
      await this.prisma.forwardMessage.findMany({
        where: {
          messageId: +idMessage,
        },
      });
    if (forwardData && Object.keys(forwardData).length !== 0) {
      let masForwardMessage: MessageWithImgMessageName[] = [];
      for (let i = 0; i < forwardData.length; i++) {
        const forwardMessage: MessageWithImgMessage =
          await this.message.getMessageWithImgReply(
            `${forwardData[i].messageIdForward}`,
          );
        masForwardMessage[i] = {
          ...forwardMessage,
          name: (
            await this.prisma.user.findFirst({
              where: {
                id: forwardMessage.userId,
              },
            })
          ).name,
        };
      }
      return masForwardMessage;
    }
  }

  async isForwardOrMessage(messageId: string) {
    const message: ForwardMessage[] = await this.prisma.forwardMessage.findMany(
      {
        where: {
          messageId: +messageId,
        },
      },
    );
    const forwardMessage: ForwardMessage[] =
      await this.prisma.forwardMessage.findMany({
        where: {
          messageIdForward: +messageId,
        },
      });
    if (message && Object.keys(message).length !== 0) {
      return 'message';
    } else {
      if (forwardMessage && Object.keys(forwardMessage).length !== 0)
        return 'forward';
      else return 'nothing';
    }
  }
  async remove(messageId: string) {
    const isForwardOrMessage: string = await this.isForwardOrMessage(messageId);
    if (isForwardOrMessage == 'message') {
      await this.prisma.forwardMessage.deleteMany({
        where: {
          id: {
            in: [
              ...(
                await this.prisma.forwardMessage.findMany({
                  where: {
                    messageId: +messageId,
                  },
                })
              ).map((oneItem) => oneItem.id),
            ],
          },
        },
      });
    } else {
      if (isForwardOrMessage == 'forward') {
        await this.prisma.forwardMessage.deleteMany({
          where: {
            messageIdForward: +messageId,
          },
        });
        return messageId;
      }
    }
  }

  findAll() {
    return `This action returns all forwardMessage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} forwardMessage`;
  }

  update(id: number, updateForwardMessageDto: UpdateForwardMessageDto) {
    return `This action updates a #${id} forwardMessage`;
  }
}
