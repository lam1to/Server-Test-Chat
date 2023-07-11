import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { GatewayService } from './gateway.service';
import { CreateGatewayDto } from './dto/create-gateway.dto';
import { UpdateGatewayDto } from './dto/update-gateway.dto';
import { Server, Socket } from 'socket.io';
import { JoinDto } from './dto/join.dto';
import { CreateChatDto } from 'src/chat/dto/createChat.dto';
import { MessageUpdateDto } from 'src/message/dto/messageUpdateDto.dto';
import { MessageDeleteDto } from 'src/message/dto/messageDelete.dto';

@WebSocketGateway({ namespace: 'chatSocket', cors: { origin: '*' } })
export class GatewayGateway {
  @WebSocketServer() server: Server;
  constructor(private readonly gatewayService: GatewayService) {}

  @SubscribeMessage('createGateway')
  async create(@MessageBody() createGatewayDto: CreateGatewayDto) {
    console.log('poluchino = ', createGatewayDto);
    return await this.gatewayService.create(createGatewayDto, this.server);
  }

  @SubscribeMessage('createChat')
  createChat(@MessageBody() dto: CreateChatDto) {
    console.log('на создание чата в сокете пришло = ', dto);
    return this.gatewayService.createChat(dto, this.server);
  }

  @SubscribeMessage('deleteChat')
  deleteChat(@MessageBody() id: string) {
    return this.gatewayService.deleteChat(id, this.server);
  }

  @SubscribeMessage('deleteMessage')
  deleteMessage(@MessageBody() dto: MessageDeleteDto) {
    console.log('на сервер получили dto = ', dto);
    return this.gatewayService.deleteMessage(dto, this.server);
  }
  @SubscribeMessage('updateMessage')
  updateMessage(@MessageBody() dto: MessageUpdateDto) {
    return this.gatewayService.updateMessage(dto, this.server);
  }

  @SubscribeMessage('findAllGateway')
  findAll() {
    return this.gatewayService.findAll();
  }

  @SubscribeMessage('join')
  joinRoom(@MessageBody() room: JoinDto) {
    return this.gatewayService.joinRoom(room, this.server);
  }
  @SubscribeMessage('findOneGateway')
  findOne(@MessageBody() id: number) {
    return this.gatewayService.findOne(id);
  }

  @SubscribeMessage('updateGateway')
  update(@MessageBody() updateGatewayDto: UpdateGatewayDto) {
    return this.gatewayService.update(updateGatewayDto.id, updateGatewayDto);
  }

  @SubscribeMessage('removeGateway')
  remove(@MessageBody() id: number) {
    return this.gatewayService.remove(id);
  }
}
