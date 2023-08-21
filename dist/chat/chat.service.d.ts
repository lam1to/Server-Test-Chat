import { CreateChatDto } from './dto/createChat.dto';
import { PrismaService } from 'src/prisma.service';
import { Chat, User } from '@prisma/client';
export interface IForAllChat {
    id: number;
    type: string;
    createdAt: Date;
    users: User[] | undefined;
}
export declare class ChatService {
    private prisma;
    constructor(prisma: PrismaService);
    createChatWithUser(chat: Chat, idUser: string): Promise<IForAllChat>;
    create(createChatDto: CreateChatDto): Promise<{
        name: string;
        type: string;
        id: number;
        createdAt: Date;
        userWhoCreateId: number;
        avatarUrl: string;
    } & {}>;
    findAll(idUsers: string): Promise<IForAllChat[]>;
    getAllChatForUser(id: string): Promise<({
        name: string;
        type: string;
        id: number;
        createdAt: Date;
        userWhoCreateId: number;
        avatarUrl: string;
    } & {})[]>;
    remove(id: number): Promise<{
        deleteChat: {
            name: string;
            type: string;
            id: number;
            createdAt: Date;
            userWhoCreateId: number;
            avatarUrl: string;
        } & {};
        userInChat: number[];
    }>;
}
