import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength, IsString } from 'class-validator';
export class RefreshDto {
  @ApiProperty({ title: 'refreshToken', type: String, default: 'nan' })
  @IsString()
  refreshToken: string;
}
