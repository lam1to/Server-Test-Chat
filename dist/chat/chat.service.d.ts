import { CreateChatDto } from './dto/createChat.dto';
import { PrismaService } from 'src/prisma.service';
import { Chat, User } from '@prisma/client';
import { MessageService } from 'src/message/message.service';
import { MessageStatusService } from 'src/message_status/message_status.service';
export interface IForAllChat {
    id: number;
    type: string;
    createdAt: Date;
    users: User[] | undefined;
    countUnreadMessage: number;
}
export declare class ChatService {
    private prisma;
    private message;
    private messageStaus;
    constructor(prisma: PrismaService, message: MessageService, messageStaus: MessageStatusService);
    createChatWithUser(chat: Chat, idUser: string): Promise<IForAllChat>;
    create(createChatDto: CreateChatDto): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        type: string;
        avatarUrl: string;
        userWhoCreateId: number;
    } & {}>;
    findAll(idUsers: string): Promise<IForAllChat[]>;
    getAllChatForUser(id: string): Promise<({
        id: number;
        createdAt: Date;
        name: string;
        type: string;
        avatarUrl: string;
        userWhoCreateId: number;
    } & {})[]>;
    findUsersForChat(chatId: number): Promise<({
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        name: string;
        lastName: string;
        avatarPath: string;
    } & {})[]>;
    remove(id: number): Promise<{
        deleteChat: {
            id: number;
            createdAt: Date;
            name: string;
            type: string;
            avatarUrl: string;
            userWhoCreateId: number;
        } & {};
        userInChat: number[];
    }>;
}
