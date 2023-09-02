import { Message } from '@prisma/client';

export class CreateMessageStatusDto {
  message: Message;
}
