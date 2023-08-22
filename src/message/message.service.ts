import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  Chat,
  ContentImg,
  ForwardMessage,
  LeftChat,
  Message,
  ReplyMessage,
  User,
} from '@prisma/client';
import { MessageUpdateDto } from './dto/messageUpdateDto.dto';
import { LeftChatDto } from 'src/left-chat/dto/LeftChat.dto';
import {
  MessageIdWithMessageReply,
  MessageWithAllEI,
  MessageWithImgDto,
  MessageWithImgMessage,
  MessageWithImgMessageName,
  MessageWithImgNameDto,
} from './dto/messageWithImg.dto';
import {
  MessageDto,
  MessageWithALLNameEC,
  MessageWithImgReply,
  returnMessagePart,
} from './dto/messageDto.dto';
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

  async getMessageWithName(message: MessageWithImgReply[]) {
    const users: User[] = await this.prisma.user.findMany({
      where: {
        id: { in: [...message.map((oneMessage) => +oneMessage.userId)] },
      },
    });
    const messageWithAllName: MessageWithALLNameEC[] = message.map(
      (oneMessage) => {
        return {
          ...oneMessage,
          name: users.filter((oneUser) => oneUser.id === +oneMessage.userId)[0]
            .name,
        };
      },
    );
    return messageWithAllName;
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

  async getMessageWithImg(idMessage: string) {
    const message: Message = await this.prisma.message.findFirst({
      where: {
        id: +idMessage,
      },
    });
    const contentImgForMessages: ContentImg[] =
      await this.prisma.contentImg.findMany({
        where: {
          messageId: message.id,
        },
      });
    const messageWithImg: MessageWithImgDto = {
      ...message,
      contentImg: [
        ...contentImgForMessages.filter(
          (oneContentImg) => oneContentImg.messageId === message.id,
        ),
      ],
    };

    return messageWithImg;
  }

  ///походу тут что-то
  async getMessageWithImgReply(idMessage: string) {
    const messageWithImg: MessageWithImgDto = await this.getMessageWithImg(
      idMessage,
    );
    const replyMessage: ReplyMessage = await this.prisma.replyMessage.findFirst(
      {
        where: {
          messageId: messageWithImg.id,
        },
      },
    );
    if (replyMessage && Object.keys(replyMessage).length !== 0) {
      const messageWithReplyImg: MessageWithImgMessage = {
        ...messageWithImg,
        messageWasAnswered: await this.getMessageWithImg(
          `${replyMessage.messageIdReply}`,
        ),
      };
      return messageWithReplyImg;
    } else return messageWithImg;
  }

  async getMessagesWithImg(message: Message[]) {
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

  async getMessageForward(message: MessageWithImgMessage[]) {
    const forwardData: ForwardMessage[] =
      await this.prisma.forwardMessage.findMany({
        where: {
          messageId: { in: [...message.map((oneMessage) => oneMessage.id)] },
        },
      });
    let messagesReturn: MessageWithAllEI[] = [];
    for (let i = 0; i < message.length; i++) {
      const forward: ForwardMessage[] = forwardData.filter(
        (oneForward) => oneForward.messageId === message[i].id,
      );
      let masForward: MessageWithImgMessageName[] = [];
      if (forward && Object.keys(forward).length !== 0) {
        for (let j = 0; j < forward.length; j++) {
          const forwardMessage: MessageWithImgMessage =
            await this.getMessageWithImgReply(`${forward[j].messageIdForward}`);
          masForward[j] = {
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
      }
      messagesReturn[i] = { ...message[i], forwardMessages: masForward };
      masForward = [];
    }
    return messagesReturn;
  }

  async getMessageWithReply(allMessageForChat: MessageWithImgDto[]) {
    const replyMessage: ReplyMessage[] =
      await this.prisma.replyMessage.findMany({
        where: {
          messageId: {
            in: [...allMessageForChat.map((oneMessage) => oneMessage.id)],
          },
        },
      });
    const MessageIdWithMessage: MessageIdWithMessageReply[] = allMessageForChat
      .map((oneMessage) => {
        const test: ReplyMessage = replyMessage.filter(
          (oneReply) => oneReply.messageId === oneMessage.id,
        )[0];
        if (test && Object.keys(test).length !== 0) {
          const idMessageSearch = test.messageIdReply;
          return {
            messageId: oneMessage.id,
            messageReply: allMessageForChat.filter(
              (oneMessage2) => oneMessage2.id == idMessageSearch,
            )[0],
          };
        }
      })
      .filter((oneItem) => oneItem !== undefined);
    const messageWithReplyImg: MessageWithImgMessage[] = allMessageForChat.map(
      (oneMessage) => {
        const messageReply = MessageIdWithMessage.filter(
          (oneItem) => oneItem.messageId === oneMessage.id,
        )[0];
        if (messageReply && messageReply.messageReply) {
          return {
            ...oneMessage,
            messageWasAnswered: messageReply.messageReply,
          };
        } else {
          return oneMessage;
        }
      },
    );
    return messageWithReplyImg;
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
      const messageWithImg: MessageWithImgDto[] = await this.getMessagesWithImg(
        filterMessages,
      );
      const messagesWithImgMessage: MessageWithImgMessage[] =
        await this.getMessageWithReply(filterMessages);
      const returnMessage: MessageWithAllEI[] = await this.getMessageForward(
        messagesWithImgMessage,
      );
      return returnMessage;
    }
    messages.sort((one, two) => one.id - two.id);

    const messagesWithImg: MessageWithImgDto[] = await this.getMessagesWithImg(
      messages,
    );
    const messagesWithImgMessage: MessageWithImgMessage[] =
      await this.getMessageWithReply(messagesWithImg);

    const returnMessage: MessageWithAllEI[] = await this.getMessageForward(
      messagesWithImgMessage,
    );

    return returnMessage;
  }

  getPart(
    messages: MessageWithImgMessage[],
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
    const allMessageForChat: MessageWithImgMessage[] = await this.getAllForChat(
      chatId,
      idUser,
    );

    const allPart: string = `${Math.ceil(
      allMessageForChat.length / +limitCount,
    )}`;
    const messagesPart: MessageWithImgMessage[] = this.getPart(
      allMessageForChat,
      allPart,
      partId,
      limitCount,
    );

    // const messagesPart:MessageWithImgDto =
    const messagesPartReturn: returnMessagePart = {
      messages: messagesPart,
      allPart: allPart,
    };

    return messagesPartReturn;
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
