import { ApiProperty } from '@nestjs/swagger';

export class CreateStorageUrlImg {
  @ApiProperty({
    title: 'img url ',
    type: String,
    default:
      'https://storage.googleapis.com/img-test-chat/174034-zamasu-goku-vegeta-multfilm-purpur-7680x4320-1691965801606.jpg',
  })
  imgUrl: string;
}
