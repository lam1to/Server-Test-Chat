import { GatewayService } from './gateway.service';
import { CreateGatewayDto } from './dto/create-gateway.dto';
import { UpdateGatewayDto } from './dto/update-gateway.dto';
import { Server } from 'socket.io';
import { JoinDto } from './dto/join.dto';
import { CreateChatDto } from 'src/chat/dto/createChat.dto';
import { MessageUpdateDto } from 'src/message/dto/messageUpdateDto.dto';
import { MessageDeleteDto } from 'src/message/dto/messageDelete.dto';
import { CreateBlockUserDto } from 'src/block-user/dto/create-block-user.dto';
export declare class GatewayGateway {
    private readonly gatewayService;
    server: Server;
    constructor(gatewayService: GatewayService);
    create(createGatewayDto: CreateGatewayDto): Promise<void>;
    createChat(dto: CreateChatDto): Promise<void>;
    deleteChat(id: string): Promise<void>;
    deleteMessage(dto: MessageDeleteDto): Promise<void>;
    updateMessage(dto: MessageUpdateDto): Promise<void>;
    findAll(): string;
    createBlockUser(dto: CreateBlockUserDto): Promise<void>;
    removeBlockUser(dto: CreateBlockUserDto): Promise<void>;
    joinRoom(room: JoinDto): Promise<void>;
    findOne(id: number): string;
    update(updateGatewayDto: UpdateGatewayDto): string;
    remove(id: number): string;
}
