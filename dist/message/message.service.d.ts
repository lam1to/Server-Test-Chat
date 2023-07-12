import { PrismaService } from 'src/prisma.service';
import { MessageCreateDto } from './dto/messageCreateDto.dto';
import { MessageUpdateDto } from './dto/messageUpdateDto.dto';
export declare class MessageService {
    private prisma;
    constructor(prisma: PrismaService);
    createMessage(dto: MessageCreateDto): Promise<{
        id: number;
        createdAt: Date;
        chatId: number;
        userId: number;
        content: string;
    } & {}>;
    updateMessage(dto: MessageUpdateDto): Promise<{
        id: number;
        createdAt: Date;
        chatId: number;
        userId: number;
        content: string;
    } & {}>;
    getAllForChat(id: string): Promise<({
        id: number;
        createdAt: Date;
        chatId: number;
        userId: number;
        content: string;
    } & {})[]>;
    remove(id: string): Promise<{
        id: number;
        createdAt: Date;
        chatId: number;
        userId: number;
        content: string;
    } & {}>;
}
