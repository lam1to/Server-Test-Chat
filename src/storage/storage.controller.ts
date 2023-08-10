import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { StorageService } from './storage.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('uploadStorageFile')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: 15728640 }, // 15MB --- 15*2^20
      fileFilter: (req, file, callback) => {
        return file.mimetype.match(/image\/(jpg|jpeg|png|gif|webp)$/)
          ? callback(null, true)
          : callback(
              new BadRequestException(
                'Invalid file type or maximum size limit exceeded',
              ),
              false,
            );
      },
    }),
  )
  async uploadStorageFile(@UploadedFile() file: Express.Multer.File) {
    return this.storageService.uploadFile(file);
  }
}
