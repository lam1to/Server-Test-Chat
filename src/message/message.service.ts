import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Chat, ContentImg, LeftChat, Message, User } from '@prisma/client';
import { MessageUpdateDto } from './dto/messageUpdateDto.dto';
import { LeftChatDto } from 'src/left-chat/dto/LeftChat.dto';
import {
  MessageWithImgDto,
  MessageWithImgNameDto,
} from './dto/messageWithImg.dto';
import { MessageDto, returnMessagePart } from './dto/messageDto.dto';
import { ChatService } from 'src/chat/chat.service';
import { UserService } from 'src/user/user.service';
import { MessageDeleteDto } from './dto/messageDelete.dto';

@Injectable()
export class MessageService {
  constructor(
    private prisma: PrismaService,
    private chat: ChatService,
    private user: UserService,
  ) {}

  async createMessage(dto: MessageDto) {
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

  getPart(
    messages: MessageWithImgDto[],
    allPart: string,
    idPart: string,
    limitCount: string,
  ) {
    if (+limitCount >= messages.length) {
      return messages;
    } else {
      if (idPart == allPart) {
        return messages.slice(0, messages.length - +limitCount * (+idPart - 1));
        // return messages.slice(+limitCount, messages.length);
      } else {
        return messages.slice(
          messages.length - +limitCount * +idPart,
          messages.length - +limitCount * (+idPart - 1),
        );
        // return messages.slice(
        //   +((+idPart - 1) * +limitCount),
        //   +(+idPart * +limitCount),
        // );
      }
    }
  }

  async getOnePartMessage(
    limitCount: string,
    chatId: string,
    partId: string,
    idUser: string,
  ) {
    const allMessageForChat: MessageWithImgDto[] = await this.getAllForChat(
      chatId,
      idUser,
    );

    // .sort((one, two) => two.id - one.id);

    const allPart: string = `${Math.ceil(
      allMessageForChat.length / +limitCount,
    )}`;
    console.log('сообщения = ', allMessageForChat);
    console.log('сколько всего сообщений = ', allMessageForChat.length);
    console.log('allPart ', allPart);
    const messagesPart: MessageWithImgDto[] = this.getPart(
      allMessageForChat,
      allPart,
      partId,
      limitCount,
    );
    console.log('messages которые получилось', messagesPart);

    // const messagesPart:MessageWithImgDto =
    const messagesPartReturn: returnMessagePart = {
      messages: messagesPart,
      allPart: allPart,
    };

    return messagesPartReturn;
  }

  async remove(id: string) {
    console.log('id что получили = ', id);
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

  async newLastMessageUpdate(updateMessage: MessageWithImgDto, userId: string) {
    const allMessage = await this.getAllForChat(
      `${updateMessage.chatId}`,
      userId,
    );
    if (allMessage[allMessage.length - 1].id === updateMessage.id) {
      const lastMessage: MessageWithImgDto = allMessage[allMessage.length - 1];
      const lastMessageWithName: MessageWithImgNameDto = {
        ...lastMessage,
        name: (
          await this.user.getUserId({
            id: `${lastMessage.userId}`,
          })
        ).name,
      };
      return lastMessageWithName;
    }
  }
  async newLastMessageDelete(dto: MessageDeleteDto) {
    const allMessage = await this.getAllForChat(dto.chatId, dto.userId);
    if (allMessage.length !== 0) {
      const lastMessage: MessageWithImgDto = allMessage[allMessage.length - 1];
      const lastMessageWithName: MessageWithImgNameDto = {
        ...lastMessage,
        name: (
          await this.user.getUserId({
            id: `${lastMessage.userId}`,
          })
        ).name,
      };
      return lastMessageWithName;
    }
    return {
      chatId: dto.chatId,
      id: '0',
      name: '',
      content: '',
      userId: '0',
      createdAt: Date.now(),
    };
  }

  async newLastMessage(message: MessageWithImgDto) {
    const newLastMessage: MessageWithImgNameDto = {
      ...message,
      name: (
        await this.user.getUserId({
          id: `${message.userId}`,
        })
      ).name,
    };
    return newLastMessage;
  }
  async getLastMessage(id: string) {
    const allChatForUser: Chat[] = await this.chat.getAllChatForUser(id);
    let lastMessage: MessageWithImgDto[] = [];
    for (let i = 0; i < allChatForUser.length; i++) {
      const messgeForChat: MessageWithImgDto[] = await this.getAllForChat(
        `${allChatForUser[i].id}`,
        id,
      );
      if (messgeForChat)
        lastMessage = [...lastMessage, messgeForChat[messgeForChat.length - 1]];
    }
    if (lastMessage) {
      let lastMessageWithName: MessageWithImgNameDto[] =
        [] as MessageWithImgNameDto[];
      for (let i = 0; i < lastMessage.length; i++) {
        if (lastMessage[i] && lastMessage[i].userId) {
          const user: User = await this.user.getUserId({
            id: `${lastMessage[i].userId}`,
          });
          if (user)
            lastMessageWithName = [
              ...lastMessageWithName,
              {
                ...lastMessage[i],
                name: user.name,
              },
            ];
        }
      }
      if (lastMessageWithName) return lastMessageWithName;
    }
  }
}
