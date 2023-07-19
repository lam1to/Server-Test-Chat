import { LeftChatService } from './left-chat.service';
export declare class LeftChatController {
    private readonly leftChatService;
    constructor(leftChatService: LeftChatService);
    findAll(req: Request): Promise<number[]>;
}
