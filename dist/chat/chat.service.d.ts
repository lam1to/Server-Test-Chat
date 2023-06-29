import { CreateChatDto } from './dto/createChat.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
export interface IForAllChat {
    id: number;
    type: string;
    createdAt: Date;
    users: User[] | undefined;
}
export declare class ChatService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createChatDto: CreateChatDto): Promise<{
        id: number;
        createdAt: Date;
        type: string;
    } & {}>;
    findAll(idUsers: string): Promise<IForAllChat[]>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        type: string;
    } & {}>;
}
