import { CreateReplyMessageDto } from './dto/create-reply-message.dto';
import { UpdateReplyMessageDto } from './dto/update-reply-message.dto';
import { PrismaService } from 'src/prisma.service';
import { MessageWithImgDto } from 'src/message/dto/messageWithImg.dto';
import { MessageService } from 'src/message/message.service';
export declare class ReplyMessageService {
    private prisma;
    private message;
    constructor(prisma: PrismaService, message: MessageService);
    create(dto: CreateReplyMessageDto): Promise<string>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateReplyMessageDto: UpdateReplyMessageDto): string;
    findMessageWasAnswered(messageId: number): Promise<MessageWithImgDto>;
    isWasAnswered(messageId: string): Promise<"wasAnswered" | "isReply" | "nothing">;
    remove(messageId: string): Promise<string>;
}
