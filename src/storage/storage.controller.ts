import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { StorageService } from './storage.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { removeFileDto } from './dto/removeFile.dto';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateStorageUrlImg } from './dto/createStorageUrlImg.dto';
import { uploadStorageFileDto } from './dto/uploadStorageFile.dto';

@ApiTags('storage')
@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @ApiOperation({ summary: 'Upload new img in google storage' })
  @ApiOkResponse({
    description: 'url',
    type: CreateStorageUrlImg,
  })
  @ApiBody({ type: uploadStorageFileDto })
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
  @ApiOperation({ summary: 'remove one file in google storage' })
  @ApiOkResponse({
    description: 'OK',
  })
  @ApiBody({ type: removeFileDto })
  @Post('removeOneFile')
  async remove(@Body() dto: removeFileDto) {
    return this.storageService.removeFile(dto.image_url);
  }
}
