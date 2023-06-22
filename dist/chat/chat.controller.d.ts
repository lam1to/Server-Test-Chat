import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/createChat.dto';
import { FindChatDto } from './dto/findDto.dto';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    create(createChatDto: CreateChatDto): Promise<{
        id: number;
        createdAt: Date;
        type: string;
    } & {}>;
    findAll(findChatDto: FindChatDto): Promise<({
        id: number;
        createdAt: Date;
        type: string;
    } & {})[]>;
    remove(id: string): Promise<{
        id: number;
        createdAt: Date;
        type: string;
    } & {}>;
}
