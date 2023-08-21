import { CreateStorageUrlImg } from 'src/storage/dto/createStorageUrlImg.dto';
import { MessageWithImgDto } from './messageWithImg.dto';
export declare class MessageDto {
    userId: string;
    chatId: string;
    content: string;
}
export declare class MessageReplyCreateDto extends MessageDto {
    messageIdWasAnswered: string;
}
export declare class returnMessageDto extends MessageDto {
    created_at: Date;
    masUrl?: CreateStorageUrlImg[];
}
export interface returnMessagePart {
    messages: MessageWithImgDto[];
    allPart: string;
}
