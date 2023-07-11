import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/createChat.dto';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    create(createChatDto: CreateChatDto): Promise<{
        id: number;
        createdAt: Date;
        type: string;
    } & {}>;
    findAll(req: Request): Promise<import("./chat.service").IForAllChat[]>;
    remove(id: string): Promise<{
        deleteChat: {
            id: number;
            createdAt: Date;
            type: string;
        } & {};
        userInChat: number[];
    }>;
}
