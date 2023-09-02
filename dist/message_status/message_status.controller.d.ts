import { MessageStatusService } from './message_status.service';
export declare class MessageStatusController {
    private readonly messageStatusService;
    constructor(messageStatusService: MessageStatusService);
    findAll(): string;
    findOne(id: string): string;
    remove(id: string): string;
}
