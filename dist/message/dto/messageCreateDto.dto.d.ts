import { createStorageUrlImgs } from 'src/storage/dto/createStorageUrlImg.dto';
export declare class MessageCreateDto {
    userId: string;
    chatId: string;
    content: string;
}
export declare class returnMessageDto extends MessageCreateDto {
    created_at: Date;
    masUrl?: createStorageUrlImgs;
}
export declare class returnMessagesDto {
    masMessages: returnMessageDto[];
}
