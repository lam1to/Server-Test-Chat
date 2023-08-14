import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength, IsString } from 'class-validator';

export class RegDto {
  @ApiProperty({ title: 'name', type: String, default: 'Daniil' })
  name: string;
  @ApiProperty({ title: 'last name', type: String, default: 'Panteleev' })
  lastName: string;
  @IsEmail()
  @ApiProperty({ title: 'email', type: String, default: 'xtxtx96@mail.ru' })
  email: string;
  @ApiProperty({ title: 'password', type: String, default: '******' })
  @MinLength(6, { message: 'Password must be at least 6 charachers long' })
  @IsString()
  password: string;
}
