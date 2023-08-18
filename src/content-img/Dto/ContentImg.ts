import { ApiProperty } from '@nestjs/swagger';

export class contentImgDto {
  @ApiProperty({
    title: 'id',
    type: String,
    default: '1',
  })
  id: string;
  @ApiProperty({
    title: 'message id',
    type: String,
    default: '1',
  })
  messageId: string;
  @ApiProperty({
    title: 'image_url',
    type: String,
    default: 'C:/Users/Lam1to/Pictures/testChatDefaultAvatar.jpg',
  })
  image_url: string;
}
