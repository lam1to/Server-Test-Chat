import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/createChat.dto';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    create(createChatDto: CreateChatDto): Promise<{
        type: string;
        id: number;
        name: string;
        createdAt: Date;
        userWhoCreateId: number;
    } & {}>;
    findAll(req: Request): Promise<import("./chat.service").IForAllChat[]>;
    remove(id: string): Promise<{
        deleteChat: {
            type: string;
            id: number;
            name: string;
            createdAt: Date;
            userWhoCreateId: number;
        } & {};
        userInChat: number[];
    }>;
}
