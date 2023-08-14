import { ApiProperty } from '@nestjs/swagger';
import { RegDto } from './reg.dto';

export class returnDataDto extends RegDto {
  @ApiProperty({ title: 'refresh token ', type: String, default: 'nan' })
  refreshToken: string;
  @ApiProperty({ title: 'access token ', type: String, default: 'nan' })
  accessToken: string;
}
