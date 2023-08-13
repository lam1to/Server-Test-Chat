import { PrismaService } from 'src/prisma.service';
import { MessageCreateDto } from './dto/messageCreateDto.dto';
import { Message } from '@prisma/client';
import { MessageUpdateDto } from './dto/messageUpdateDto.dto';
import { LeftChatDto } from 'src/left-chat/dto/LeftChat.dto';
import { MessageWithImgDto } from './dto/messageWithImg.dto';
export declare class MessageService {
    private prisma;
    constructor(prisma: PrismaService);
    createMessage(dto: MessageCreateDto): Promise<{
        id: number;
        content: string;
        createdAt: Date;
        chatId: number;
        userId: number;
    } & {}>;
    updateMessage(dto: MessageUpdateDto): Promise<{
        id: number;
        content: string;
        createdAt: Date;
        chatId: number;
        userId: number;
    } & {}>;
    getMessageWithImg(message: Message[]): Promise<MessageWithImgDto[]>;
    getAllForChat(id: string, idUser: string): Promise<MessageWithImgDto[]>;
    remove(id: string): Promise<{
        id: number;
        content: string;
        createdAt: Date;
        chatId: number;
        userId: number;
    } & {}>;
    messageLeft(dto: LeftChatDto, flag: boolean): Promise<{
        message: {
            id: number;
            content: string;
            createdAt: Date;
            chatId: number;
            userId: number;
        } & {};
        user?: undefined;
    } | {
        message: {
            id: number;
            content: string;
            createdAt: Date;
            chatId: number;
            userId: number;
        } & {};
        user: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            password: string;
            name: string;
            lastName: string;
            avatarPath: string;
        } & {};
    }>;
}
