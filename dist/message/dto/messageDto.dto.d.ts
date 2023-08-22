import { ContentImg } from '@prisma/client';
import { CreateStorageUrlImg } from 'src/storage/dto/createStorageUrlImg.dto';
import { MessageWithImgDto } from './messageWithImg.dto';
export declare class MessageDto {
    userId: string;
    chatId: string;
    content: string;
}
export declare class MessageWithId extends MessageDto {
    id: string;
}
export declare class MessageWithImgReply extends MessageWithId {
    contentImg?: ContentImg[];
    messageWasAnswered?: MessageWithImgDto;
}
export declare class MessageWithALLNameEC extends MessageWithImgReply {
    name: string;
}
export declare class MessageForwardCreateDto extends MessageWithId {
    forwardMessages: MessageWithImgReply[];
}
export declare class MessageForward extends MessageWithImgReply {
    forwardMessages: MessageWithImgReply[];
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
