import { ApiProperty } from '@nestjs/swagger';
import { ContentImg, Message } from '@prisma/client';
import { contentImgDto } from 'src/content-img/Dto/ContentImg';

export interface MessageWithImgDto extends Message {
  contentImg?: ContentImg[];
}
export interface MessageWithImgNameDto extends MessageWithImgDto {
  name: string;
}
export interface MessageWithImgMessage extends MessageWithImgDto {
  messageWasAnswered?: MessageWithImgDto;
}

export interface MessageIdWithMessageReply {
  messageId: number;
  messageReply: MessageWithImgDto;
}
