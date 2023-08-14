import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { userReturnDto } from 'src/user/Dto/userReturn.dto';

export class chatDto {
  @ApiProperty({
    title: 'id',
    type: Number,
    default: '1',
  })
  id: number;
  @ApiProperty({
    title: 'Type',
    type: String,
    default: 'DM',
  })
  type: string;
  @ApiProperty({
    title: 'Created at',
    type: Date,
    default: Date.now(),
  })
  createdAt: Date;
}

export class chatWithUserDto extends chatDto {
  @ApiProperty({
    title: 'users',
    type: [userReturnDto],
    default: [],
  })
  users: User[];
}

export class deleteChat {
  @ApiProperty({
    title: 'chat',
    type: chatDto,
    default: {} as chatDto,
  })
  deleteChat: chatDto;
  @ApiProperty({
    title: 'id user who was in chat',
    type: [String],
    default: `[${'1'},${'2'}]`,
  })
  userInChatId: string[];
}
