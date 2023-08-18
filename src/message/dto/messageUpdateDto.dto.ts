import { ApiProperty } from '@nestjs/swagger';

export class MessageUpdateDto {
  @ApiProperty({
    title: 'Message id',
    type: String,
    default: '1',
  })
  messageId: string;
  @ApiProperty({
    title: 'Content',
    type: String,
    default: 'Hi!',
  })
  content: string;
  @ApiProperty({
    title: 'Chat id',
    type: String,
    default: '1',
  })
  chatId: string;
  @ApiProperty({
    title: 'user id who auth',
    type: String,
    default: '1',
  })
  userId: string;
}
