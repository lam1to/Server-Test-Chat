import { ApiProperty } from '@nestjs/swagger';

export class updateUserAvatarDto {
  @ApiProperty({ title: 'id user', type: String, default: '1' })
  id: string;
  @ApiProperty({
    title: 'avatar_path',
    type: String,
    default: 'https://storage.googleapis.com/img-test-chat/user.png',
  })
  avatar_path: string;
}
