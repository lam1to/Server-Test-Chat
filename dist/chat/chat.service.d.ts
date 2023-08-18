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
        id: number;
        createdAt: Date;
        name: string;
        type: string;
        userWhoCreateId: number;
    } & {}>;
    findAll(idUsers: string): Promise<IForAllChat[]>;
    getAllChatForUser(id: string): Promise<({
        id: number;
        createdAt: Date;
        name: string;
        type: string;
        userWhoCreateId: number;
    } & {})[]>;
    remove(id: number): Promise<{
        deleteChat: {
            id: number;
            createdAt: Date;
            name: string;
            type: string;
            userWhoCreateId: number;
        } & {};
        userInChat: number[];
    }>;
}
