import { CreateStorageUrlImg } from 'src/storage/dto/createStorageUrlImg.dto';

export class messageWithImgCreateDto {
  userId: string;
  chatId: string;
  content: string;
  masUrl: CreateStorageUrlImg[];
}
export class messageReplyWithImgCreateDto extends messageWithImgCreateDto {
  messageIdWasAnswered: string;
}

// export class MessageIdWithMessageReply {
//   messageId: string;
//   messageReply:
// }
