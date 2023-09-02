import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({ title: 'email', type: String, default: 'xtxtx96@mail.ru' })
  @IsEmail()
  email: string;
  @ApiProperty({ title: 'password', type: String, default: '********' })
  @MinLength(6, { message: 'Password must be at least 6 charachers long' })
  @IsString()
  password: string;
}
