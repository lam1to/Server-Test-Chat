import { CreateStorageUrlImg } from 'src/storage/dto/createStorageUrlImg.dto';
export declare class MessageDto {
    userId: string;
    chatId: string;
    content: string;
}
export declare class returnMessageDto extends MessageDto {
    created_at: Date;
    masUrl?: CreateStorageUrlImg[];
}
