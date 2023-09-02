import { ApiProperty } from '@nestjs/swagger';

export class CreateBlockUserDto {
  @ApiProperty({ title: 'idUserWhoBlocked', type: String, default: '1' })
  idUserWhoBlocked: string;
  @ApiProperty({ title: 'ApiProperty', type: String, default: '1' })
  idUserWhoWasBlocked: string;
}
