import { PrismaService } from 'src/prisma.service';
import { Message } from '@prisma/client';
import { MessageUpdateDto } from './dto/messageUpdateDto.dto';
import { LeftChatDto } from 'src/left-chat/dto/LeftChat.dto';
import { MessageWithImgDto } from './dto/messageWithImg.dto';
import { MessageDto } from './dto/messageDto.dto';
export declare class MessageService {
    private prisma;
    constructor(prisma: PrismaService);
    createMessage(dto: MessageDto): Promise<{
        content: string;
        id: number;
        userId: number;
        chatId: number;
        createdAt: Date;
    } & {}>;
    updateMessage(dto: MessageUpdateDto): Promise<{
        content: string;
        id: number;
        userId: number;
        chatId: number;
        createdAt: Date;
    } & {}>;
    getMessageWithImg(message: Message[]): Promise<MessageWithImgDto[]>;
    getAllForChat(id: string, idUser: string): Promise<MessageWithImgDto[]>;
    remove(id: string): Promise<{
        content: string;
        id: number;
        userId: number;
        chatId: number;
        createdAt: Date;
    } & {}>;
    messageLeft(dto: LeftChatDto, flag: boolean): Promise<{
        message: {
            content: string;
            id: number;
            userId: number;
            chatId: number;
            createdAt: Date;
        } & {};
        user?: undefined;
    } | {
        message: {
            content: string;
            id: number;
            userId: number;
            chatId: number;
            createdAt: Date;
        } & {};
        user: {
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            password: string;
            lastName: string;
            avatarPath: string;
        } & {};
    }>;
}
