import { ApiProperty } from '@nestjs/swagger';

export class updateUserFiDto {
  @ApiProperty({ title: 'new user name', type: String, default: 'name' })
  name: string;
  @ApiProperty({
    title: 'new user last name',
    type: String,
    default: 'last name',
  })
  lastName: string;
}
