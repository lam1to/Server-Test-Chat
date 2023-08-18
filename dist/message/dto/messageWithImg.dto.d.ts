import { ContentImg, Message } from '@prisma/client';
export interface MessageWithImgDto extends Message {
    contentImg?: ContentImg[];
}
export interface MessageWithImgNameDto extends MessageWithImgDto {
    name: string;
}
