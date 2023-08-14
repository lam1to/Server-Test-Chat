import { MessageService } from './message.service';
import { MessageDto } from './dto/messageDto.dto';
import { ContentImgService } from 'src/content-img/content-img.service';
import { MessageUpdateDto } from './dto/messageUpdateDto.dto';
export declare class MessageController {
    private readonly messageService;
    private contentImg;
    constructor(messageService: MessageService, contentImg: ContentImgService);
    createMessage(dto: MessageDto): Promise<{
        content: string;
        id: number;
        userId: number;
        chatId: number;
        createdAt: Date;
    } & {}>;
    getAllForChat(id: string, req: Request): Promise<import("./dto/messageWithImg.dto").MessageWithImgDto[]>;
    updateMessage(dto: MessageUpdateDto): Promise<{
        content: string;
        id: number;
        userId: number;
        chatId: number;
        createdAt: Date;
    } & {}>;
}
