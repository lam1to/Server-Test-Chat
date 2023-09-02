import { CreateForwardMessageDto } from './dto/create-forward-message.dto';
import { UpdateForwardMessageDto } from './dto/update-forward-message.dto';
import { PrismaService } from 'src/prisma.service';
import { MessageService } from 'src/message/message.service';
import { MessageWithImgMessageName } from 'src/message/dto/messageWithImg.dto';
export declare class ForwardMessageService {
    private prisma;
    private message;
    constructor(prisma: PrismaService, message: MessageService);
    create(dto: CreateForwardMessageDto): Promise<string>;
    getForwardMessagesForMessage(idMessage: string): Promise<MessageWithImgMessageName[]>;
    isForwardOrMessage(messageId: string): Promise<"message" | "nothing" | "forward">;
    remove(messageId: string): Promise<string>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateForwardMessageDto: UpdateForwardMessageDto): string;
}
