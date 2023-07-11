import { MessageService } from './message.service';
import { MessageCreateDto } from './dto/messageCreateDto.dto';
import { MessageUpdateDto } from './dto/messageUpdateDto.dto';
export declare class MessageController {
    private readonly messageService;
    constructor(messageService: MessageService);
    createMessage(dto: MessageCreateDto): Promise<{
        userId: number;
        chatId: number;
        content: string;
        id: number;
        createdAt: Date;
    } & {}>;
    getAllForChat(id: string): Promise<({
        userId: number;
        chatId: number;
        content: string;
        id: number;
        createdAt: Date;
    } & {})[]>;
    updateMessage(dto: MessageUpdateDto): Promise<{
        userId: number;
        chatId: number;
        content: string;
        id: number;
        createdAt: Date;
    } & {}>;
}
