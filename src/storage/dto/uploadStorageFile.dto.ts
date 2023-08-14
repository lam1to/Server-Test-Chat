import { File } from '@google-cloud/storage';
import { ApiProperty } from '@nestjs/swagger';

export class uploadStorageFileDto {
  @ApiProperty({
    title: 'file',
    type: File,
    default: {} as File,
  })
  file: Express.Multer.File;
}
