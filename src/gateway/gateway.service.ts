import { Injectable } from '@nestjs/common';
import { CreateGatewayDto } from './dto/create-gateway.dto';
import { UpdateGatewayDto } from './dto/update-gateway.dto';
import { Server } from 'socket.io';
import { JoinDto } from './dto/join.dto';
import { WebSocketServer } from '@nestjs/websockets';
import { PrismaService } from 'src/prisma.service';
import { MessageService } from 'src/message/message.service';
import { CreateChatDto } from 'src/chat/dto/createChat.dto';
import { ChatService } from 'src/chat/chat.service';

@Injectable()
export class GatewayService {
  constructor(
    private prisma: PrismaService,
    private messageS: MessageService,
    private chat: ChatService,
  ) {}
  async create(createGatewayDto: CreateGatewayDto, server: Server) {
    const message = await this.messageS.createMessage(createGatewayDto);
    //если не join внутри create, То сообщения не отправляются в комнату, мб на client будет по другому
    this.joinRoom({ chatId: createGatewayDto.chatId }, server);
    //.in(createGatewayDto.chatId)
    server.emit(`message${createGatewayDto.chatId}`, message);
    return createGatewayDto.content;
  }

  async createChat(dto: CreateChatDto, server: Server) {
    const chat = await this.chat.create(dto);
    console.log('в сокете чат создался такой = ', chat);
    dto.idUsers.map((oneUser) => {
      server.emit(`chatCreate${oneUser}`, chat);
    });
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
