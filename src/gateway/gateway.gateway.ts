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
import { CreateBlockUserDto } from 'src/block-user/dto/create-block-user.dto';
import { LeftChatDto } from 'src/left-chat/dto/LeftChat.dto';
import { MessageCreateDto } from 'src/message/dto/messageCreateDto.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  BadRequestException,
  Body,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { memoryStorage } from 'multer';
import { ContentImg, Message } from '@prisma/client';

@WebSocketGateway({ namespace: 'chatSocket', cors: { origin: '*' } })
export class GatewayGateway {
  @WebSocketServer() server: Server;
  constructor(private readonly gatewayService: GatewayService) {}

  @SubscribeMessage('createGateway')
  async create(@Body() messageCreateDto: MessageCreateDto) {
    return await this.gatewayService.create(messageCreateDto, this.server);
  }

  async createWithImg(message: Message, contentImg: ContentImg[]) {
    console.log('зашло в gateWay');
    await this.gatewayService.createWithImg(message, contentImg, this.server);
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

  @SubscribeMessage('createBlockUser')
  createBlockUser(@MessageBody() dto: CreateBlockUserDto) {
    return this.gatewayService.createBlockUser(dto, this.server);
  }

  @SubscribeMessage('removeBlockUser')
  removeBlockUser(@MessageBody() dto: CreateBlockUserDto) {
    return this.gatewayService.removeBlockUser(dto, this.server);
  }

  @SubscribeMessage('createLeftChat')
  createLeftChat(@MessageBody() dto: LeftChatDto) {
    return this.gatewayService.createLeftChat(dto, this.server);
  }

  @SubscribeMessage('removeLeftChat')
  removeLeftChat(@MessageBody() dto: LeftChatDto) {
    return this.gatewayService.removeLeftChat(dto, this.server);
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
