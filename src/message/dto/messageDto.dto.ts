import { ApiProperty } from '@nestjs/swagger';
import { ContentImg } from '@prisma/client';
import { CreateStorageUrlImg } from 'src/storage/dto/createStorageUrlImg.dto';
import { MessageWithImgDto } from './messageWithImg.dto';

export class MessageDto {
  @ApiProperty({
    title: 'User id',
    type: String,
    default: '1',
  })
  userId: string;
  @ApiProperty({
    title: 'Chat id',
    type: String,
    default: '1',
  })
  chatId: string;
  @ApiProperty({
    title: 'Content',
    type: String,
    default: 'Hi!',
  })
  content: string;
}

export class MessageWithId extends MessageDto {
  @ApiProperty({
    title: 'id',
    type: String,
    default: '1',
  })
  id: string;
}

export class MessageWithImgReply extends MessageWithId {
  contentImg?: ContentImg[];
  messageWasAnswered?: MessageWithImgDto;
}

export class MessageWithALLNameEC extends MessageWithImgReply {
  name: string;
}

export class MessageForwardCreateDto extends MessageWithId {
  forwardMessages: MessageWithImgReply[];
}
export class MessageForward extends MessageWithImgReply {
  forwardMessages: MessageWithImgReply[];
}

export class MessageReplyCreateDto extends MessageDto {
  messageIdWasAnswered: string;
}

export class returnMessageDto extends MessageDto {
  @ApiProperty({
    title: 'Created_at',
    type: Date,
    default: Date.now(),
  })
  created_at: Date;
  @ApiProperty({
    title: 'Created_at',
    type: [CreateStorageUrlImg],
    default: Date.now(),
  })
  masUrl?: CreateStorageUrlImg[];
}

// export class CMessageWithImg extends MessageDto {
//   contentImg?: ContentImg[];
// }
// export class CMessageWithName extends CMessageWithImg {
//   @ApiProperty({
//     title: 'name user who send message',
//     type: String,
//     default: 'Даниил',
//   })
//   name: string;
// }

export interface returnMessagePart {
  messages: MessageWithImgDto[];
  allPart: string;
}
