import { GatewayService } from './gateway.service';
import { UpdateGatewayDto } from './dto/update-gateway.dto';
import { Server } from 'socket.io';
import { JoinDto } from './dto/join.dto';
import { CreateChatDto } from 'src/chat/dto/createChat.dto';
import { MessageUpdateDto } from 'src/message/dto/messageUpdateDto.dto';
import { MessageDeleteDto } from 'src/message/dto/messageDelete.dto';
import { CreateBlockUserDto } from 'src/block-user/dto/create-block-user.dto';
import { LeftChatDto } from 'src/left-chat/dto/LeftChat.dto';
import { MessageCreateDto } from 'src/message/dto/messageCreateDto.dto';
import { messageWithImgCreateDto } from 'src/message/dto/messageCreateWithImg.dto';
export declare class GatewayGateway {
    private readonly gatewayService;
    server: Server;
    constructor(gatewayService: GatewayService);
    create(messageCreateDto: MessageCreateDto): Promise<string>;
    createWithImg(messageWithImgCreateDto: messageWithImgCreateDto): Promise<void>;
    createChat(dto: CreateChatDto): Promise<void>;
    deleteChat(id: string): Promise<void>;
    deleteMessage(dto: MessageDeleteDto): Promise<void>;
    updateMessage(dto: MessageUpdateDto): Promise<void>;
    findAll(): string;
    createBlockUser(dto: CreateBlockUserDto): Promise<void>;
    removeBlockUser(dto: CreateBlockUserDto): Promise<void>;
    createLeftChat(dto: LeftChatDto): Promise<void>;
    removeLeftChat(dto: LeftChatDto): Promise<void>;
    joinRoom(room: JoinDto): Promise<void>;
    findOne(id: number): string;
    update(updateGatewayDto: UpdateGatewayDto): string;
    remove(id: number): string;
}
