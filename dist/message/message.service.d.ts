import { PrismaService } from 'src/prisma.service';
import { Message } from '@prisma/client';
import { MessageUpdateDto } from './dto/messageUpdateDto.dto';
import { LeftChatDto } from 'src/left-chat/dto/LeftChat.dto';
import { MessageWithImgDto, MessageWithImgMessage, MessageWithImgNameDto } from './dto/messageWithImg.dto';
import { MessageDto, returnMessagePart } from './dto/messageDto.dto';
import { ChatService } from 'src/chat/chat.service';
import { UserService } from 'src/user/user.service';
import { MessageDeleteDto } from './dto/messageDelete.dto';
export declare class MessageService {
    private prisma;
    private chat;
    private user;
    constructor(prisma: PrismaService, chat: ChatService, user: UserService);
    createMessage(dto: MessageDto): Promise<{
        id: number;
        createdAt: Date;
        content: string;
        chatId: number;
        userId: number;
    } & {}>;
    updateMessage(dto: MessageUpdateDto): Promise<{
        id: number;
        createdAt: Date;
        content: string;
        chatId: number;
        userId: number;
    } & {}>;
    getMessageWithImg(idMessage: string): Promise<MessageWithImgDto>;
    getMessagesWithImg(message: Message[]): Promise<MessageWithImgDto[]>;
    getMessageWithReply(allMessageForChat: MessageWithImgDto[]): Promise<MessageWithImgMessage[]>;
    getAllForChat(id: string, idUser: string): Promise<MessageWithImgMessage[]>;
    getPart(messages: MessageWithImgMessage[], allPart: string, idPart: string, limitCount: string): MessageWithImgMessage[];
    getOnePartMessage(limitCount: string, chatId: string, partId: string, idUser: string): Promise<returnMessagePart>;
    remove(id: string): Promise<{
        id: number;
        createdAt: Date;
        content: string;
        chatId: number;
        userId: number;
    } & {}>;
    messageLeft(dto: LeftChatDto, flag: boolean): Promise<{
        message: {
            id: number;
            createdAt: Date;
            content: string;
            chatId: number;
            userId: number;
        } & {};
        user?: undefined;
    } | {
        message: {
            id: number;
            createdAt: Date;
            content: string;
            chatId: number;
            userId: number;
        } & {};
        user: {
            email: string;
            password: string;
            name: string;
            lastName: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            avatarPath: string;
        } & {};
    }>;
    newLastMessageUpdate(updateMessage: MessageWithImgDto, userId: string): Promise<MessageWithImgNameDto>;
    newLastMessageDelete(dto: MessageDeleteDto): Promise<MessageWithImgNameDto | {
        chatId: string;
        id: string;
        name: string;
        content: string;
        userId: string;
        createdAt: number;
    }>;
    newLastMessage(message: MessageWithImgDto): Promise<MessageWithImgNameDto>;
    getLastMessage(id: string): Promise<MessageWithImgNameDto[]>;
}
