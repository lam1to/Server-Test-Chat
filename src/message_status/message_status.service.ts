import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateMessageStatusDto } from './dto/create-message_status.dto';
import { UpdateMessageStatusDto } from './dto/update-message_status.dto';
import { PrismaService } from 'src/prisma.service';
import { ChatService } from 'src/chat/chat.service';
import { MessageWithImgDto } from 'src/message/dto/messageWithImg.dto';
import { Message, MessageStatus, User } from '@prisma/client';
import { MessageService } from 'src/message/message.service';

@Injectable()
export class MessageStatusService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => MessageService))
    private message: MessageService, // @Inject(forwardRef(() => ChatService)) // private chat: ChatService,
  ) {}

  async editOne(userId: number, messageId: number, chatId: number) {
    const messageStatus: MessageStatus =
      await this.prisma.messageStatus.findFirst({
        where: {
          userId: userId,
          chatId: chatId,
        },
      });
    if (messageStatus) {
      await this.prisma.messageStatus.update({
        where: {
          id: messageStatus.id,
        },
        data: {
          lastMessageId: messageId,
        },
      });
    }
  }
  // async update(message: MessageWithImgDto) {
  //   const allUsersChat: User[] = await this.chat.findUsersForChat(
  //     message.chatId,
  //   );
  //   for (let i = 0; i < allUsersChat.length; i++) {
  //     await this.editOne(allUsersChat[i].id, message.id, message.chatId);
  //     console.log('message status зашли в редактирование ');
  //   }
  // }
  async createOrEdit(userId: number, messageId: number, chatId: number) {
    const messageStatus: MessageStatus =
      await this.prisma.messageStatus.findFirst({
        where: {
          userId: userId,
          chatId: chatId,
        },
      });
    if (messageStatus && Object.keys(messageStatus).length !== 0) {
      await this.editOne(userId, messageId, chatId);
    } else {
      await this.createOne(userId, messageId, chatId);
    }
  }

  async createOne(userId: number, messageId: number, chatId: number) {
    await this.prisma.messageStatus.create({
      data: {
        userId: userId,
        lastMessageId: messageId,
        chatId: chatId,
      },
    });
  }

  // async create(message: MessageWithImgDto) {
  //   const allUsersChat: User[] = await this.chat.findUsersForChat(
  //     message.chatId,
  //   );
  //   for (let i = 0; i < allUsersChat.length; i++) {
  //     await this.createOne(allUsersChat[i].id, message.id, message.chatId);
  //     console.log('message status зашли в создание');
  //   }
  // }

  async editOrDeleteWhenDeleteOneMessage(
    userId: number,
    messageId: number,
    chatId: number,
  ) {
    const index: number = await this.message.findIndex(
      userId,
      messageId,
      chatId,
    );
    console.log('index который мы получили = ', index);
    if (index === 0) {
      await this.deleteAll(chatId);
    } else {
      //1)Сначала найти всех пользователей у кого так же последним увиденным было это сообщение
      //2)После изменить в message Status с этими пользователями новый lastMessageId
      //3) для этого нужна функция которая найдет по индексу в чате messageId
      const newIndex = index - 1;
      const newMessage: Message = await this.message.findMessageByIndex(
        userId,
        newIndex,
        chatId,
      );
      await this.prisma.messageStatus.updateMany({
        where: {
          id: {
            in: (
              await this.prisma.messageStatus.findMany({
                where: {
                  lastMessageId: messageId,
                  chatId: chatId,
                },
              })
            ).map((oneMessageStatus) => oneMessageStatus.id),
          },
        },
        data: {
          lastMessageId: newMessage.id,
        },
      });
    }
  }
  async deleteAll(chatId: number) {
    await this.prisma.messageStatus.deleteMany({
      where: {
        chatId: chatId,
      },
    });
    return chatId;
  }

  findAll() {
    return `This action returns all messageStatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} messageStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} messageStatus`;
  }
}
