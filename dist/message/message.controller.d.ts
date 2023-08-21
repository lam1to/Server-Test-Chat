import { MessageService } from './message.service';
import { MessageDto } from './dto/messageDto.dto';
import { ContentImgService } from 'src/content-img/content-img.service';
import { MessageUpdateDto } from './dto/messageUpdateDto.dto';
export declare class MessageController {
    private readonly messageService;
    private contentImg;
    constructor(messageService: MessageService, contentImg: ContentImgService);
    createMessage(dto: MessageDto): Promise<{
        id: number;
        createdAt: Date;
        content: string;
        chatId: number;
        userId: number;
    } & {}>;
    getAllForChat(id: string, req: Request): Promise<import("./dto/messageWithImg.dto").MessageWithImgMessage[]>;
    getOnePartMessage(limitCount: string, chatId: string, partId: string, req: Request): Promise<import("./dto/messageDto.dto").returnMessagePart>;
    updateMessage(dto: MessageUpdateDto): Promise<{
        id: number;
        createdAt: Date;
        content: string;
        chatId: number;
        userId: number;
    } & {}>;
    getLastMessage(req: Request): Promise<import("./dto/messageWithImg.dto").MessageWithImgNameDto[]>;
}
