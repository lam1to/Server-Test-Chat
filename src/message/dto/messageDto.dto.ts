import { ApiProperty } from '@nestjs/swagger';
import { CreateStorageUrlImg } from 'src/storage/dto/createStorageUrlImg.dto';

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
