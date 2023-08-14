import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDto {
  @ApiProperty({
    title: 'Id user who create',
    type: String,
    default: '1',
  })
  userWhoCreateId: string;
  @ApiProperty({
    title: 'mas id users',
    type: [String],
    default: `[${'1'},${'2'}]`,
  })
  idUsers: string[];
  @ApiProperty({
    title: 'Name chat',
    type: String,
    default: 'Group',
  })
  name: string;
}
