import { ApiProperty } from '@nestjs/swagger';

export class userReturnDto {
  @ApiProperty({
    title: 'id',
    type: Number,
    default: 1,
  })
  id: number;
  @ApiProperty({
    title: 'Created_at',
    type: Date,
    default: Date.now(),
  })
  created_at: Date;
  @ApiProperty({
    title: 'Update_at',
    type: Date,
    default: Date.now(),
  })
  update_at: Date;
  @ApiProperty({
    title: 'Email',
    type: String,
    default: 'xtxtx96@mail.ru',
  })
  email: string;
  @ApiProperty({
    title: 'Password',
    type: String,
    default: '********',
  })
  password: string;
  @ApiProperty({
    title: 'Name',
    type: String,
    default: 'Daniil',
  })
  name: string;
  @ApiProperty({
    title: 'LastName',
    type: String,
    default: 'Panteleev',
  })
  lastName: string;
  @ApiProperty({
    title: 'Avatar path',
    type: String,
    default: 'C:/Users/Lam1to/Pictures/testChatDefaultAvatar.jpg',
  })
  avatar_path: string;
}
