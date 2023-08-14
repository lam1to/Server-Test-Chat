import { ApiProperty } from '@nestjs/swagger';

export class createContentImgDto {
  @ApiProperty({
    title: 'Message id',
    type: String,
    default: '1',
  })
  messageId: string;
  @ApiProperty({
    title: 'Image url',
    type: String,
    default: 'C:/Users/Lam1to/Pictures/testChatDefaultAvatar.jpg',
  })
  image_url: string;
}
