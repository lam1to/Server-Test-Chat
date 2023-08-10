import { MessageService } from './message.service';
import { MessageCreateDto } from './dto/messageCreateDto.dto';
import { MessageUpdateDto } from './dto/messageUpdateDto.dto';
import { ContentImgService } from 'src/content-img/content-img.service';
export declare class MessageController {
    private readonly messageService;
    private contentImg;
    constructor(messageService: MessageService, contentImg: ContentImgService);
    createMessage(dto: MessageCreateDto): Promise<{
        id: number;
        content: string;
        createdAt: Date;
        chatId: number;
        userId: number;
    } & {}>;
    getAllForChat(id: string, req: Request): Promise<({
        id: number;
        content: string;
        createdAt: Date;
        chatId: number;
        userId: number;
    } & {})[]>;
    updateMessage(dto: MessageUpdateDto): Promise<{
        id: number;
        content: string;
        createdAt: Date;
        chatId: number;
        userId: number;
    } & {}>;
}
