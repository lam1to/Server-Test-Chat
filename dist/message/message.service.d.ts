/// <reference types="multer" />
import { PrismaService } from 'src/prisma.service';
import { MessageCreateDto } from './dto/messageCreateDto.dto';
import { MessageUpdateDto } from './dto/messageUpdateDto.dto';
import { LeftChatDto } from 'src/left-chat/dto/LeftChat.dto';
import { StorageService } from 'src/storage/storage.service';
import { ContentImgService } from 'src/content-img/content-img.service';
import { GatewayGateway } from 'src/gateway/gateway.gateway';
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
    createMessageWithImg(dto: MessageCreateDto, files: Express.Multer.File[], gateway: GatewayGateway, storage: StorageService, contentImg: ContentImgService): Promise<void>;
    updateMessage(dto: MessageUpdateDto): Promise<{
        id: number;
        content: string;
        createdAt: Date;
        chatId: number;
        userId: number;
    } & {}>;
    getAllForChat(id: string, idUser: string): Promise<({
        id: number;
        content: string;
        createdAt: Date;
        chatId: number;
        userId: number;
    } & {})[]>;
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
