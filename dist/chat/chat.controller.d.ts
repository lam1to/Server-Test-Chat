import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/createChat.dto';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    create(createChatDto: CreateChatDto): Promise<{
        name: string;
        type: string;
        id: number;
        createdAt: Date;
        userWhoCreateId: number;
        avatarUrl: string;
    } & {}>;
    findAll(req: Request): Promise<import("./chat.service").IForAllChat[]>;
    remove(id: string): Promise<{
        deleteChat: {
            name: string;
            type: string;
            id: number;
            createdAt: Date;
            userWhoCreateId: number;
            avatarUrl: string;
        } & {};
        userInChat: number[];
    }>;
}
