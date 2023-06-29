import { CreateChatDto } from './dto/createChat.dto';
import { PrismaService } from 'src/prisma.service';
export declare class ChatService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createChatDto: CreateChatDto): Promise<{
        id: number;
        type: string;
        createdAt: Date;
    } & {}>;
    findAll(idUsers: string): Promise<{
        chats: ({
            id: number;
            type: string;
            createdAt: Date;
        } & {})[];
        userChat: ({
            id: number;
            chatId: number;
            userId: number;
        } & {})[];
    }>;
    remove(id: number): Promise<{
        id: number;
        type: string;
        createdAt: Date;
    } & {}>;
}
