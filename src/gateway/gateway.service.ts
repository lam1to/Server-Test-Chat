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

@Injectable()
export class GatewayService {
  constructor(
    private prisma: PrismaService,
    private messageS: MessageService,
    private chat: ChatService,
  ) {}
  async create(createGatewayDto: CreateGatewayDto, server: Server) {
    const message = await this.messageS.createMessage(createGatewayDto);
    server.emit(`message${createGatewayDto.chatId}`, message);
    console.log('отдали = ', message);
    // return createGatewayDto.content;
  }

  async createChat(dto: CreateChatDto, server: Server) {
    const chat = await this.chat.create(dto);

    dto.idUsers.map(async (oneUser) => {
      const chatWithUser: IForAllChat = await this.chat.createChatWithUser(
        chat,
        oneUser,
      );
      server.emit(`chatCreate${oneUser}`, chatWithUser);
    });
  }

  async deleteChat(id: string, server: Server) {
    const deleteChat = await this.chat.remove(+id);
    deleteChat.userInChat.map((oneUser) => {
      server.emit(`chatDelete${oneUser}`, deleteChat.deleteChat);
    });
  }
  async deleteMessage(dto: MessageDeleteDto, server: Server) {
    const deleteMessage = await this.messageS.remove(dto.messageId);
    server.emit(`messageDelete${dto.chatId}`, deleteMessage);
  }
  async updateMessage(dto: MessageUpdateDto, server: Server) {
    console.log('dto in service = ', dto);
    const updateMessage = await this.messageS.updateMessage(dto);
    console.log('updateMessage = ', updateMessage);
    server.emit(`messageUpdate${dto.chatId}`, updateMessage);
  }

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
