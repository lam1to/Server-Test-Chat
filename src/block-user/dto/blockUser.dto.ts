import { ApiProperty } from '@nestjs/swagger';

export class blockUserDto {
  @ApiProperty({ title: 'user who blocked', type: String, default: '1' })
  user_Who_BlocketId: string;
  @ApiProperty({ title: 'user who was blocked', type: String, default: '2' })
  user_Who_Was_BlocketId: string;
}
