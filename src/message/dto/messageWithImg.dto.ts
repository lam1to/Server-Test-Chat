import { ApiProperty } from '@nestjs/swagger';
import { ContentImg, Message } from '@prisma/client';
import { contentImgDto } from 'src/content-img/Dto/ContentImg';
import { MessageWithALLNameEC, MessageWithImgReply } from './messageDto.dto';

export interface MessageWithImgDto extends Message {
  contentImg?: ContentImg[];
}
export interface MessageWithImgNameDto extends MessageWithImgDto {
  name: string;
}
export interface MessageWithImgMessage extends MessageWithImgDto {
  messageWasAnswered?: MessageWithImgDto;
}

export interface MessageWithImgMessageName extends MessageWithImgDto {
  messageWasAnswered?: MessageWithImgDto;
  name: string;
}

export interface MessageWithAllEC extends MessageWithImgMessage {
  forwardMessages: MessageWithALLNameEC[];
}

export interface MessageWithAllEI extends MessageWithImgMessage {
  forwardMessages: MessageWithImgMessageName[];
}
export interface MessageIdWithMessageReply {
  messageId: number;
  messageReply: MessageWithImgDto;
}
