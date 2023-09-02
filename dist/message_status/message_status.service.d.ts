import { PrismaService } from 'src/prisma.service';
import { MessageService } from 'src/message/message.service';
export declare class MessageStatusService {
    private prisma;
    private message;
    constructor(prisma: PrismaService, message: MessageService);
    editOne(userId: number, messageId: number, chatId: number): Promise<void>;
    createOrEdit(userId: number, messageId: number, chatId: number): Promise<void>;
    createOne(userId: number, messageId: number, chatId: number): Promise<void>;
    editOrDeleteWhenDeleteOneMessage(userId: number, messageId: number, chatId: number): Promise<void>;
    deleteAll(chatId: number): Promise<number>;
    findAll(): string;
    findOne(id: number): string;
    remove(id: number): string;
}
