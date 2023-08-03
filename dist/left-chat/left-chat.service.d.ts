import { PrismaService } from 'src/prisma.service';
import { LeftChatDto } from './dto/LeftChat.dto';
export declare class LeftChatService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: LeftChatDto): Promise<{
        id: number;
        createdAt: Date;
        chatId: number;
        userId: number;
    } & {}>;
    delete(dto: LeftChatDto): Promise<{
        id: number;
        createdAt: Date;
        chatId: number;
        userId: number;
    } & {}>;
    findAll(id: string): Promise<number[]>;
}
