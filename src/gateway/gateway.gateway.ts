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

@WebSocketGateway({ namespace: 'chat', cors: { origin: '*' } })
export class GatewayGateway {
  @WebSocketServer() server: Server;
  constructor(private readonly gatewayService: GatewayService) {}

  @SubscribeMessage('createGateway')
  async create(@MessageBody() createGatewayDto: CreateGatewayDto) {
    return await this.gatewayService.create(createGatewayDto, this.server);
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
