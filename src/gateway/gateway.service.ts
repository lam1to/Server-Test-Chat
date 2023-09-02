import { Injectable } from '@nestjs/common';
import { CreateGatewayDto } from './dto/create-gateway.dto';
import { UpdateGatewayDto } from './dto/update-gateway.dto';
import { Server } from 'socket.io';
import { JoinDto } from './dto/join.dto';
import { WebSocketServer } from '@nestjs/websockets';
import { PrismaService } from 'src/prisma.service';
import { MessageService } from 'src/message/message.service';
import { CreateChatDto } from 'src/chat/dto/createChat.dto';
import { ChatService, IForAllChat } from 'src/chat/chat.service';
import { MessageUpdateDto } from 'src/message/dto/messageUpdateDto.dto';
import { MessageDeleteDto } from 'src/message/dto/messageDelete.dto';
import { async } from 'rxjs';
import { CreateBlockUserDto } from 'src/block-user/dto/create-block-user.dto';
import { BlockUser, ContentImg, LeftChat, Message, User } from '@prisma/client';
import { BlockUserService } from 'src/block-user/block-user.service';
import { LeftChatDto } from 'src/left-chat/dto/LeftChat.dto';
import { LeftChatService } from 'src/left-chat/left-chat.service';
import {
  MessageDto,
  MessageForward,
  MessageForwardCreateDto,
  MessageReplyCreateDto,
  updateIsReadMessageDto,
} from 'src/message/dto/messageDto.dto';
import {
  MessageWithAllEC,
  MessageWithAllEI,
  MessageWithImgDto,
  MessageWithImgMessage,
  MessageWithImgMessageName,
  MessageWithImgNameDto,
} from 'src/message/dto/messageWithImg.dto';
import {
  messageForwardWithImgReplyDto,
  messageReplyWithImgCreateDto,
  messageWithImgCreateDto,
} from 'src/message/dto/messageCreateWithImg.dto';
import { ContentImgService } from 'src/content-img/content-img.service';
import {
  deleteAddContentImgsDto,
  deleteContentImgDto,
} from 'src/content-img/Dto/DeleteContentImg.dto';
import { StorageService } from 'src/storage/storage.service';
import { messageUpdateWithImgDto } from 'src/message/dto/messageUpdateWithImg.dto';
import { updateUserAvatarDto } from 'src/user/Dto/updateUserAvatar.dto';
import { UserService } from 'src/user/user.service';
import { ReplyMessageService } from 'src/reply-message/reply-message.service';
import { ForwardMessageService } from 'src/forward-message/forward-message.service';
import { MessageStatusService } from 'src/message_status/message_status.service';

interface PropsLeftChat {
  message: Message;
  user?: User;
}

@Injectable()
export class GatewayService {
  constructor(
    private chat: ChatService,
    private blockUser: BlockUserService,
    private leftChat: LeftChatService,
    private prisma: PrismaService,
    private messageS: MessageService,
    private contentImg: ContentImgService,
    private storage: StorageService,
    private user: UserService,
    private replyMessage: ReplyMessageService,
    private forwardMessage: ForwardMessageService,
    private messageStatus: MessageStatusService,
  ) {}

  async create(messageCreateDto: MessageDto, server: Server) {
    const message: MessageWithImgDto = await this.messageS.createMessage(
      messageCreateDto,
    );
    await this.messageStatus.createOrEdit(
      +messageCreateDto.userId,
      message.id,
      +messageCreateDto.chatId,
    );
    const newLastMessage: MessageWithImgNameDto =
      await this.messageS.newLastMessage(message);
    const users: User[] = await this.chat.findUsersForChat(
      +messageCreateDto.chatId,
    );
    for (let i = 0; i < users.length; i++) {
      const countUnreadMessage: number =
        await this.messageS.countUnreadMessageOneChat(
          +messageCreateDto.chatId,
          users[i].id,
        );
      server.emit(`newMessage${users[i].id}`, {
        countUnreadMessage: countUnreadMessage,
        chatId: messageCreateDto.chatId,
      });
    }
    server.emit(`message${messageCreateDto.chatId}`, message);
    server.emit(`newLastMessage${messageCreateDto.chatId}`, newLastMessage);

    return messageCreateDto.content;
  }

  async createReply(dto: MessageReplyCreateDto, server: Server) {
    const message: MessageWithImgDto = await this.messageS.createMessage(dto);
    // await this.messageStatus.create(message);
    await this.replyMessage.create({
      messageId: `${message.id}`,
      messageIdWasAnswered: dto.messageIdWasAnswered,
    });

    await this.messageStatus.createOrEdit(+dto.userId, message.id, +dto.chatId);
    const messageWasAnswered: MessageWithImgDto =
      await this.messageS.getMessageWithImg(dto.messageIdWasAnswered);
    const messageWithReply: MessageWithImgMessage = {
      ...message,
      messageWasAnswered: messageWasAnswered,
    };
    const newLastMessage: MessageWithImgNameDto =
      await this.messageS.newLastMessage(message);

    const users: User[] = await this.chat.findUsersForChat(+dto.chatId);
    for (let i = 0; i < users.length; i++) {
      const countUnreadMessage: number =
        await this.messageS.countUnreadMessageOneChat(+dto.chatId, users[i].id);
      server.emit(`newMessage${users[i].id}`, {
        countUnreadMessage: countUnreadMessage,
        chatId: dto.chatId,
      });
    }
    server.emit(`newLastMessage${dto.chatId}`, newLastMessage);
    server.emit(`message${dto.chatId}`, messageWithReply);
  }

  async createReplyWithImg(dto: messageReplyWithImgCreateDto, server: Server) {
    const message: MessageWithImgDto = await this.messageS.createMessage(dto);
    // await this.messageStatus.create(message);
    await this.messageStatus.createOrEdit(+dto.userId, message.id, +dto.chatId);
    const contentImg: ContentImg[] = await this.contentImg.createMany(
      dto.masUrl,
      message.id,
    );
    const messageWithImg: MessageWithImgDto = {
      ...message,
      contentImg: contentImg,
    };
    const messageWasAnswered: MessageWithImgDto =
      await this.messageS.getMessageWithImg(dto.messageIdWasAnswered);
    const messageWithReply: MessageWithImgMessage = {
      ...messageWithImg,
      messageWasAnswered: messageWasAnswered,
    };
    const newLastMessage: MessageWithImgNameDto =
      await this.messageS.newLastMessage(messageWithImg);

    const users: User[] = await this.chat.findUsersForChat(+dto.chatId);
    for (let i = 0; i < users.length; i++) {
      const countUnreadMessage: number =
        await this.messageS.countUnreadMessageOneChat(+dto.chatId, users[i].id);
      server.emit(`newMessage${users[i].id}`, {
        countUnreadMessage: countUnreadMessage,
        chatId: dto.chatId,
      });
    }
    server.emit(`message${dto.chatId}`, messageWithReply);
    server.emit(`newLastMessage${message.chatId}`, newLastMessage);
  }

  async createForwardMessage(dto: MessageForwardCreateDto, server: Server) {
    const message: MessageWithImgDto = await this.messageS.createMessage(dto);
    await this.messageStatus.createOrEdit(+dto.userId, message.id, +dto.chatId);
    await this.forwardMessage.create({
      forwardMessagesId: [
        ...dto.forwardMessages.map((oneForwardMessage) => oneForwardMessage.id),
      ],
      messageId: `${message.id}`,
    });
    const forwardMessage = await this.messageS.getMessageWithName(
      dto.forwardMessages,
    );
    const messageWithAll: MessageWithAllEC = {
      ...message,
      forwardMessages: [...forwardMessage],
    };
    const newLastMessage: MessageWithImgNameDto =
      await this.messageS.newLastMessage(message);

    const users: User[] = await this.chat.findUsersForChat(+dto.chatId);
    for (let i = 0; i < users.length; i++) {
      const countUnreadMessage: number =
        await this.messageS.countUnreadMessageOneChat(+dto.chatId, users[i].id);
      server.emit(`newMessage${users[i].id}`, {
        countUnreadMessage: countUnreadMessage,
        chatId: dto.chatId,
      });
    }
    server.emit(`newLastMessage${dto.chatId}`, newLastMessage);
    server.emit(`message${dto.chatId}`, messageWithAll);
  }
  async createForwardMessageWithImg(
    dto: messageForwardWithImgReplyDto,
    server: Server,
  ) {
    const message: MessageWithImgDto = await this.messageS.createMessage(dto);
    await this.messageStatus.createOrEdit(+dto.userId, message.id, +dto.chatId);
    await this.forwardMessage.create({
      forwardMessagesId: [
        ...dto.forwardMessages.map((oneForwardMessage) => oneForwardMessage.id),
      ],
      messageId: `${message.id}`,
    });
    const contentImg: ContentImg[] = await this.contentImg.createMany(
      dto.masUrl,
      message.id,
    );
    const messageWithImg: MessageWithImgDto = {
      ...message,
      contentImg: contentImg,
    };
    const forwardMessage = await this.messageS.getMessageWithName(
      dto.forwardMessages,
    );
    const messageWithAll: MessageWithAllEC = {
      ...messageWithImg,
      forwardMessages: forwardMessage,
    };

    const newLastMessage: MessageWithImgNameDto =
      await this.messageS.newLastMessage(messageWithAll);
    const users: User[] = await this.chat.findUsersForChat(+dto.chatId);
    for (let i = 0; i < users.length; i++) {
      const countUnreadMessage: number =
        await this.messageS.countUnreadMessageOneChat(+dto.chatId, users[i].id);
      server.emit(`newMessage${users[i].id}`, {
        countUnreadMessage: countUnreadMessage,
        chatId: dto.chatId,
      });
    }
    server.emit(`message${message.chatId}`, messageWithAll);
    server.emit(`newLastMessage${message.chatId}`, newLastMessage);
  }

  async deleteMessage(dto: MessageDeleteDto, server: Server) {
    await this.messageStatus.editOrDeleteWhenDeleteOneMessage(
      +dto.userId,
      +dto.messageId,
      +dto.chatId,
    );
    const idMessageWasAnswered: string = await this.replyMessage.remove(
      dto.messageId,
    );
    const idMessageForward: string = await this.forwardMessage.remove(
      dto.messageId,
    );
    const deleteContentImg: ContentImg[] =
      await this.contentImg.deleteForMessage(dto.messageId);
    // await this.messageStatus.delete(+dto.messageId);
    const deleteMessage = await this.messageS.remove(dto.messageId);
    if (deleteContentImg && deleteContentImg.length > 0)
      await this.storage.removeFiles(
        deleteContentImg.map((oneDeleteContent) => oneDeleteContent.image_url),
      );

    const newLastMessageDelete = await this.messageS.newLastMessageDelete(dto);
    server.emit(`messageDelete${dto.chatId}`, deleteMessage);
    server.emit(`newLastMessage${dto.chatId}`, newLastMessageDelete);
    if (idMessageWasAnswered)
      server.emit(
        `deleteMessageWasAnswered${dto.chatId}`,
        idMessageWasAnswered,
      );
    if (idMessageForward)
      server.emit(`deleteForward${dto.chatId}`, idMessageForward);
  }

  async createWithImg(dto: messageWithImgCreateDto, server: Server) {
    const message: Message = await this.messageS.createMessage({
      content: dto.content,
      userId: dto.userId,
      chatId: dto.chatId,
    });
    await this.messageStatus.createOrEdit(+dto.userId, message.id, +dto.chatId);
    const contentImg: ContentImg[] = await this.contentImg.createMany(
      dto.masUrl,
      message.id,
    );
    const messageWithImg: MessageWithImgDto = {
      ...message,
      contentImg: contentImg,
    };
    const newLastMessage: MessageWithImgNameDto =
      await this.messageS.newLastMessage(messageWithImg);
    server.emit(`message${message.chatId}`, messageWithImg);
    server.emit(`newLastMessage${message.chatId}`, newLastMessage);
  }
  async updateMessage(dto: MessageUpdateDto, server: Server) {
    const isReplyWasAnswered: string = await this.replyMessage.isWasAnswered(
      dto.messageId,
    );
    const updateMessage = await this.messageS.updateMessage(dto);
    const isForwardOrMessage: string =
      await this.forwardMessage.isForwardOrMessage(dto.messageId);
    if (isReplyWasAnswered === 'isReply') {
      const messageWasAnswred: MessageWithImgDto =
        await this.replyMessage.findMessageWasAnswered(updateMessage.id);
      const updateMessageReturn: MessageWithImgMessage = {
        ...updateMessage,
        messageWasAnswered: messageWasAnswred,
      };
      server.emit(`messageUpdate${dto.chatId}`, updateMessageReturn);
    } else {
      if (isForwardOrMessage === 'message') {
        const masForwardMessage: MessageWithImgMessageName[] =
          await this.forwardMessage.getForwardMessagesForMessage(dto.messageId);
        const updateMessageForward: MessageWithAllEI = {
          ...updateMessage,
          forwardMessages: masForwardMessage,
        };
        server.emit(`messageUpdate${dto.chatId}`, updateMessageForward);
      } else {
        server.emit(`messageUpdate${dto.chatId}`, updateMessage);
      }
    }
    const newLastMessageUpdate: MessageWithImgNameDto =
      await this.messageS.newLastMessageUpdate(updateMessage, dto.userId);
    if (isReplyWasAnswered === 'wasAnswered') {
      server.emit(`editWasAnswered${dto.chatId}`, updateMessage);
    }

    if (newLastMessageUpdate && Object.keys(newLastMessageUpdate).length !== 0)
      server.emit('newLastMessage', newLastMessageUpdate);
  }

  async editMessageWithImg(dto: messageUpdateWithImgDto, server: Server) {
    const isReplyWasAnswered: string = await this.replyMessage.isWasAnswered(
      dto.messageId,
    );
    const isForwardOrMessage: string =
      await this.forwardMessage.isForwardOrMessage(dto.messageId);
    const updateMessage = await this.messageS.updateMessage(dto);

    const dataDelete: ContentImg[] = await this.contentImg.deleteContentImgs(
      dto,
    );
    if (dataDelete)
      await this.storage.removeFiles(
        dataDelete.map((oneDelete) => oneDelete.image_url),
      );

    await this.contentImg.createContentImgs(dto);
    await this.contentImg.changePlace(dto);
    const allContentImgForMessage = await this.contentImg.findAllForMessage(
      dto.messageId,
    );
    const updateMessageWithImg: MessageWithImgDto = {
      ...updateMessage,
      contentImg: allContentImgForMessage,
    };
    const newLastMessageUpdate: MessageWithImgNameDto =
      await this.messageS.newLastMessageUpdate(
        updateMessageWithImg,
        dto.userId,
      );
    if (newLastMessageUpdate && Object.keys(newLastMessageUpdate).length !== 0)
      server.emit(`newLastMessage${dto.chatId}`, newLastMessageUpdate);

    if (isReplyWasAnswered === 'wasAnswered') {
      server.emit(`editWasAnswered${dto.chatId}`, updateMessageWithImg);
    }
    if (isReplyWasAnswered === 'isReply') {
      const messageWasAnswred: MessageWithImgDto =
        await this.replyMessage.findMessageWasAnswered(updateMessage.id);
      const updateMessageReturn: MessageWithImgMessage = {
        ...updateMessageWithImg,
        messageWasAnswered: messageWasAnswred,
      };
      server.emit(`messageUpdate${dto.chatId}`, updateMessageReturn);
    } else {
      if (isForwardOrMessage === 'message') {
        const masForwardMessage: MessageWithImgMessageName[] =
          await this.forwardMessage.getForwardMessagesForMessage(dto.messageId);
        const updateMessageForward: MessageWithAllEI = {
          ...updateMessageWithImg,
          forwardMessages: masForwardMessage,
        };
        server.emit(`messageUpdate${dto.chatId}`, updateMessageForward);
      } else {
        server.emit(`messageUpdate${dto.chatId}`, updateMessageWithImg);
      }
    }
  }

  // async updateIsReadMessage(dto: updateIsReadMessageDto, server: Server) {
  //   await this.messageS.editIsReadMessage(dto.messageId);
  // }

  async createChat(dto: CreateChatDto, server: Server) {
    const chat = await this.chat.create(dto);

    dto.idUsers.map(async (oneUser) => {
      const chatWithUser: IForAllChat = await this.chat.createChatWithUser(
        chat,
        oneUser,
      );
      server.emit(`chatCreate${oneUser}`, chatWithUser);
    });
    server.emit(
      `chatCreate${dto.userWhoCreateId}`,
      await this.chat.createChatWithUser(chat, dto.userWhoCreateId),
    );
  }

  async deleteChat(id: string, server: Server) {
    await this.messageStatus.deleteAll(+id);
    const deleteChat = await this.chat.remove(+id);
    deleteChat.userInChat.map((oneUser) => {
      server.emit(`chatDelete${oneUser}`, deleteChat.deleteChat);
    });
  }

  async createBlockUser(dto: CreateBlockUserDto, server: Server) {
    const blockUser: BlockUser = await this.blockUser.create(dto);
    server.emit(
      `newBlockedUser${blockUser.user_Who_BlocketId}`,
      blockUser.user_Who_Was_BlocketId,
    );
    server.emit(
      `newBlocker${blockUser.user_Who_Was_BlocketId}`,
      blockUser.user_Who_BlocketId,
    );
  }

  async removeBlockUser(dto: CreateBlockUserDto, server: Server) {
    const blockUser: BlockUser = await this.blockUser.remove(
      +dto.idUserWhoBlocked,
      +dto.idUserWhoWasBlocked,
    );
    if (blockUser) {
      server.emit(
        `deleteBlockedUser${blockUser.user_Who_BlocketId}`,
        blockUser.user_Who_Was_BlocketId,
      );
      server.emit(
        `deleteBlocker${blockUser.user_Who_Was_BlocketId}`,
        blockUser.user_Who_BlocketId,
      );
    }
  }

  async createLeftChat(dto: LeftChatDto, server: Server) {
    const leftChat: LeftChat = await this.leftChat.create(dto);
    const messageUser: PropsLeftChat = await this.messageS.messageLeft(
      dto,
      true,
    );
    server.emit(`message${leftChat.chatId}`, messageUser.message);

    await this.prisma.userChat.delete({
      where: {
        id: (
          await this.prisma.userChat.findFirst({
            where: {
              userId: leftChat.userId,
              chatId: leftChat.chatId,
            },
          })
        ).id,
      },
    });
    server.emit(`newLeftChat${dto.idUsers}`, leftChat.chatId);
    server.emit(`newLeftUserInChat${dto.idChat}`, {
      ...leftChat,
    });
    const lastMessage: MessageWithImgNameDto =
      await this.messageS.newLastMessage(messageUser.message);
    server.emit(`newLastMessage${dto.idChat}`, lastMessage);
  }
  async removeLeftChat(dto: LeftChatDto, server: Server) {
    const leftChat: LeftChat = await this.leftChat.delete(dto);
    const messageUser: PropsLeftChat = await this.messageS.messageLeft(
      dto,
      false,
    );
    server.emit(`message${leftChat.chatId}`, messageUser.message);
    await this.prisma.userChat.create({
      data: {
        chatId: leftChat.chatId,
        userId: leftChat.userId,
      },
    });
    server.emit(`deleteLeftChat${dto.idUsers}`, leftChat.chatId);
    server.emit(`deleteLeftUserInChat${dto.idChat}`, {
      ...leftChat,
      user: messageUser.user,
    });
    const lastMessage: MessageWithImgNameDto =
      await this.messageS.newLastMessage(messageUser.message);
    server.emit(`newLastMessage${dto.idChat}`, lastMessage);
  }

  // async updateUserAvatar(dto: updateUserAvatarDto, server: Server) {
  //   const user: User = await this.user.updateUserAvatar(dto);
  //   server.emit(`updateUser${dto.id}`, user);
  // }

  async loadingImg(server: Server) {}

  findAll() {
    return `This action returns all gateway`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gateway`;
  }

  async joinRoom(room: JoinDto, server: Server) {
    await server.socketsJoin(room.chatId);
  }

  update(id: number, updateGatewayDto: UpdateGatewayDto) {
    return `This action updates a #${id} gateway`;
  }

  remove(id: number) {
    return `This action removes a #${id} gateway`;
  }
}
