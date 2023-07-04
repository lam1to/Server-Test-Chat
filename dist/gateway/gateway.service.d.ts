import { CreateGatewayDto } from './dto/create-gateway.dto';
import { UpdateGatewayDto } from './dto/update-gateway.dto';
import { Server } from 'socket.io';
import { JoinDto } from './dto/join.dto';
import { PrismaService } from 'src/prisma.service';
import { MessageService } from 'src/message/message.service';
import { CreateChatDto } from 'src/chat/dto/createChat.dto';
import { ChatService } from 'src/chat/chat.service';
export declare class GatewayService {
    private prisma;
    private messageS;
    private chat;
    constructor(prisma: PrismaService, messageS: MessageService, chat: ChatService);
    create(createGatewayDto: CreateGatewayDto, server: Server): Promise<string>;
    createChat(dto: CreateChatDto, server: Server): Promise<void>;
    findAll(): string;
    findOne(id: number): string;
    joinRoom(room: JoinDto, server: Server): Promise<void>;
    update(id: number, updateGatewayDto: UpdateGatewayDto): string;
    remove(id: number): string;
}
