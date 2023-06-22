import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/createChat.dto';
import { FindChatDto } from './dto/findDto.dto';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    create(createChatDto: CreateChatDto): Promise<{
        id: number;
        type: string;
        createdAt: Date;
    } & {}>;
    findAll(findChatDto: FindChatDto): Promise<({
        id: number;
        type: string;
        createdAt: Date;
    } & {})[]>;
    findOne(id: string): string;
    remove(id: string): string;
}
