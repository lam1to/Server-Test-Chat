import { CreateStorageUrlImg } from 'src/storage/dto/createStorageUrlImg.dto';
export declare class messageWithImgCreateDto {
    userId: string;
    chatId: string;
    content: string;
    masUrl: CreateStorageUrlImg[];
}
export declare class messageReplyWithImgCreateDto extends messageWithImgCreateDto {
    messageIdWasAnswered: string;
}
