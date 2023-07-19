import { PrismaService } from 'src/prisma.service';
import { LeftChatDto } from './dto/LeftChat.dto';
export declare class LeftChatService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: LeftChatDto): Promise<{
        id: number;
        userId: number;
        chatId: number;
        createdAt: Date;
    } & {}>;
    delete(dto: LeftChatDto): Promise<{
        id: number;
        userId: number;
        chatId: number;
        createdAt: Date;
    } & {}>;
    findAll(id: string): Promise<number[]>;
}
