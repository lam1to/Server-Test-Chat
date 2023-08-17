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
import { MessageDto } from 'src/message/dto/messageDto.dto';
import { MessageWithImgDto } from 'src/message/dto/messageWithImg.dto';
import { messageWithImgCreateDto } from 'src/message/dto/messageCreateWithImg.dto';
import { ContentImgService } from 'src/content-img/content-img.service';
import {
  deleteAddContentImgsDto,
  deleteContentImgDto,
} from 'src/content-img/Dto/DeleteContentImg.dto';
import { StorageService } from 'src/storage/storage.service';
import { messageUpdateWithImgDto } from 'src/message/dto/messageUpdateWithImg.dto';
import { updateUserAvatarDto } from 'src/user/Dto/updateUserAvatar.dto';
import { UserService } from 'src/user/user.service';

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
  ) {}

  async create(messageCreateDto: MessageDto, server: Server) {
    const message: MessageWithImgDto = await this.messageS.createMessage(
      messageCreateDto,
    );
    server.emit(`message${messageCreateDto.chatId}`, message);
    return messageCreateDto.content;
  }
  async createWithImg(dto: messageWithImgCreateDto, server: Server) {
    const message: Message = await this.messageS.createMessage({
      content: dto.content,
      userId: dto.userId,
      chatId: dto.chatId,
    });
    const contentImg: ContentImg[] = await this.contentImg.createMany(
      dto.masUrl,
      message.id,
    );
    const messageWithImg: MessageWithImgDto = {
      ...message,
      contentImg: contentImg,
    };
    server.emit(`message${message.chatId}`, messageWithImg);
  }

  async editMessageWithImg(dto: messageUpdateWithImgDto, server: Server) {
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
    server.emit(`messageUpdate${dto.chatId}`, updateMessageWithImg);
  }

  // async updateUserAvatar(dto: updateUserAvatarDto, server: Server) {
  //   const user: User = await this.user.updateUserAvatar(dto);
  //   server.emit(`updateUser${dto.id}`, user);
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
    const deleteChat = await this.chat.remove(+id);
    deleteChat.userInChat.map((oneUser) => {
      server.emit(`chatDelete${oneUser}`, deleteChat.deleteChat);
    });
  }
  async deleteMessage(dto: MessageDeleteDto, server: Server) {
    const deleteContentImg: ContentImg[] =
      await this.contentImg.deleteForMessage(dto.messageId);
    const deleteMessage = await this.messageS.remove(dto.messageId);
    if (deleteContentImg.length > 0)
      await this.storage.removeFiles(
        deleteContentImg.map((oneDeleteContent) => oneDeleteContent.image_url),
      );
    server.emit(`messageDelete${dto.chatId}`, deleteMessage);
  }
  async updateMessage(dto: MessageUpdateDto, server: Server) {
    const updateMessage = await this.messageS.updateMessage(dto);
    server.emit(`messageUpdate${dto.chatId}`, updateMessage);
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
  }

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
