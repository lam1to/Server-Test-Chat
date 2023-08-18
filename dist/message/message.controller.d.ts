import { MessageService } from './message.service';
import { MessageDto } from './dto/messageDto.dto';
import { ContentImgService } from 'src/content-img/content-img.service';
import { MessageUpdateDto } from './dto/messageUpdateDto.dto';
import { MessageWithImgDto } from './dto/messageWithImg.dto';
export declare class MessageController {
    private readonly messageService;
    private contentImg;
    constructor(messageService: MessageService, contentImg: ContentImgService);
    createMessage(dto: MessageDto): Promise<{
        id: number;
        content: string;
        createdAt: Date;
        chatId: number;
        userId: number;
    } & {}>;
    getAllForChat(id: string, req: Request): Promise<MessageWithImgDto[]>;
    updateMessage(dto: MessageUpdateDto): Promise<{
        id: number;
        content: string;
        createdAt: Date;
        chatId: number;
        userId: number;
    } & {}>;
    getLastMessage(req: Request): Promise<import("./dto/messageWithImg.dto").MessageWithImgNameDto[]>;
}
