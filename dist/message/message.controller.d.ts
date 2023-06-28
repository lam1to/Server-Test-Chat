import { MessageService } from './message.service';
import { MessageCreateDto } from './dto/messageCreateDto.dto';
import { MessageUpdateDto } from './dto/messageUpdateDto.dto';
export declare class MessageController {
    private readonly messageService;
    constructor(messageService: MessageService);
    createMessage(dto: MessageCreateDto): Promise<{
        id: number;
        createdAt: Date;
        chatId: number;
        userId: number;
        content: string;
    } & {}>;
    updateMessage(dto: MessageUpdateDto): Promise<{
        id: number;
        createdAt: Date;
        chatId: number;
        userId: number;
        content: string;
    } & {}>;
}
