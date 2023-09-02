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
import {
  MessageDto,
  MessageForwardCreateDto,
  MessageReplyCreateDto,
  updateIsReadMessageDto,
} from 'src/message/dto/messageDto.dto';
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
import {
  messageForwardWithImgReplyDto,
  messageReplyWithImgCreateDto,
  messageWithImgCreateDto,
} from 'src/message/dto/messageCreateWithImg.dto';
import {
  deleteAddContentImgsDto,
  deleteContentImgDto,
} from 'src/content-img/Dto/DeleteContentImg.dto';
import { messageUpdateWithImgDto } from 'src/message/dto/messageUpdateWithImg.dto';
import { ApiTags } from '@nestjs/swagger';
import { updateUserAvatarDto } from 'src/user/Dto/updateUserAvatar.dto';

@ApiTags('ChatSocket')
@WebSocketGateway({ namespace: 'chatSocket', cors: { origin: '*' } })
export class GatewayGateway {
  @WebSocketServer() server: Server;
  constructor(private readonly gatewayService: GatewayService) {}

  @SubscribeMessage('createGateway')
  async create(@Body() messageCreateDto: MessageDto) {
    return await this.gatewayService.create(messageCreateDto, this.server);
  }

  @SubscribeMessage('createMessageWithImg')
  async createWithImg(
    @Body() messageWithImgCreateDto: messageWithImgCreateDto,
  ) {
    console.log('зашло в gateWay');
    console.log('получили такие данные = ', messageWithImgCreateDto);
    await this.gatewayService.createWithImg(
      messageWithImgCreateDto,
      this.server,
    );
  }

  @SubscribeMessage('createReplyMessage')
  async createReply(@Body() messageCreateDto: MessageReplyCreateDto) {
    return await this.gatewayService.createReply(messageCreateDto, this.server);
  }

  @SubscribeMessage('createReplyMessageWithImg')
  async createReplyWithImg(
    @Body() messageReplyWithImgCreateDto: messageReplyWithImgCreateDto,
  ) {
    console.log('зашло в gateWay');
    console.log('получили такие данные = ', messageReplyWithImgCreateDto);
    await this.gatewayService.createReplyWithImg(
      messageReplyWithImgCreateDto,
      this.server,
    );
  }
  @SubscribeMessage('createForwardMessage')
  async createForwardMessage(@Body() dto: MessageForwardCreateDto) {
    return await this.gatewayService.createForwardMessage(dto, this.server);
  }
  // @SubscribeMessage('updateIsReadMessage')
  // async updateIsReadMessage(@Body() dto: updateIsReadMessageDto) {
  //   return await this.gatewayService.updateIsReadMessage(dto, this.server);
  // }

  @SubscribeMessage('createForwardMessageWithImg')
  async createForwardMessageWithImg(
    @Body() dto: messageForwardWithImgReplyDto,
  ) {
    console.log('зашло в gateWay');
    console.log('получили такие данные = ', dto);
    await this.gatewayService.createForwardMessageWithImg(dto, this.server);
  }

  @SubscribeMessage('updateMessageWithImg')
  async editMessageWithImg(@Body() dto: messageUpdateWithImgDto) {
    console.log('зашло в gateWay');
    console.log('получили такие данные = ', messageWithImgCreateDto);
    await this.gatewayService.editMessageWithImg(dto, this.server);
  }

  // @SubscribeMessage('updateUserAvatar')
  // async updateUserAvatar(@Body() dto: updateUserAvatarDto) {
  //   console.log('зашло в gateWay');
  //   console.log('получили такие данные = ', messageWithImgCreateDto);
  //   await this.gatewayService.updateUserAvatar(dto, this.server);
  // }

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
