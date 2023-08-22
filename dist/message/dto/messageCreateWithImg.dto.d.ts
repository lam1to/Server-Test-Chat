import { CreateStorageUrlImg } from 'src/storage/dto/createStorageUrlImg.dto';
import { MessageWithImgReply } from './messageDto.dto';
export declare class messageWithImgCreateDto {
    userId: string;
    chatId: string;
    content: string;
    masUrl: CreateStorageUrlImg[];
}
export declare class messageReplyWithImgCreateDto extends messageWithImgCreateDto {
    messageIdWasAnswered: string;
}
export declare class messageForwardWithImgReplyDto extends messageWithImgCreateDto {
    forwardMessages: MessageWithImgReply[];
}
