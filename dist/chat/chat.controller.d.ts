import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/createChat.dto';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    create(createChatDto: CreateChatDto): Promise<{
        id: number;
        type: string;
        createdAt: Date;
    } & {}>;
    findAll(req: Request): Promise<{
        chats: ({
            id: number;
            type: string;
            createdAt: Date;
        } & {})[];
        userChat: ({
            id: number;
            chatId: number;
            userId: number;
        } & {})[];
    }>;
    remove(id: string): Promise<{
        id: number;
        type: string;
        createdAt: Date;
    } & {}>;
}
