import { GatewayService } from './gateway.service';
import { CreateGatewayDto } from './dto/create-gateway.dto';
import { UpdateGatewayDto } from './dto/update-gateway.dto';
import { Server } from 'socket.io';
import { JoinDto } from './dto/join.dto';
import { CreateChatDto } from 'src/chat/dto/createChat.dto';
export declare class GatewayGateway {
    private readonly gatewayService;
    server: Server;
    constructor(gatewayService: GatewayService);
    create(createGatewayDto: CreateGatewayDto): Promise<string>;
    createChat(dto: CreateChatDto): Promise<void>;
    findAll(): string;
    joinRoom(room: JoinDto): Promise<void>;
    findOne(id: number): string;
    update(updateGatewayDto: UpdateGatewayDto): string;
    remove(id: number): string;
}
