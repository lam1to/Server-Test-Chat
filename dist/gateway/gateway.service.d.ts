import { CreateGatewayDto } from './dto/create-gateway.dto';
import { UpdateGatewayDto } from './dto/update-gateway.dto';
import { Server } from 'socket.io';
import { JoinDto } from './dto/join.dto';
import { PrismaService } from 'src/prisma.service';
import { MessageService } from 'src/message/message.service';
export declare class GatewayService {
    private prisma;
    private messageS;
    constructor(prisma: PrismaService, messageS: MessageService);
    create(createGatewayDto: CreateGatewayDto, server: Server): Promise<string>;
    findAll(): string;
    findOne(id: number): string;
    joinRoom(room: JoinDto, server: Server): Promise<void>;
    update(id: number, updateGatewayDto: UpdateGatewayDto): string;
    remove(id: number): string;
}
