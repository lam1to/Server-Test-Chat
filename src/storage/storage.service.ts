import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStorageDto } from './dto/create-storage.dto';
import { UpdateStorageDto } from './dto/update-storage.dto';
import { Bucket, Storage } from '@google-cloud/storage';
import { ConfigService } from '@nestjs/config';
import { IGoogleCloudConfig } from 'src/config/configuration';
import { parse } from 'path';

@Injectable()
export class StorageService {
  private bucket: Bucket;
  private storage: Storage;
  constructor(private configService: ConfigService) {
    this.storage = new Storage({
      keyFilename:
        this.configService.get<IGoogleCloudConfig>('googleCloud').keyFilename,
    });
    this.bucket = this.storage.bucket(
      this.configService.get<IGoogleCloudConfig>('googleCloud').bucketName,
    );
  }

  private setFilename(uploadedFile: Express.Multer.File): string {
    const fileName = parse(uploadedFile.originalname);
    return `${fileName.name}-${Date.now()}${fileName.ext}`
      .replace(/^\.+/g, '')
      .replace(/^\/+/g, '')
      .replace(/[\r\n]/g, '_');
  }

  async uploadFile(uploadedFiles: Express.Multer.File[]) {
    const masFileName: string[] = uploadedFiles.map((oneFile) =>
      this.setFilename(oneFile),
    );
    const masFileBucket = masFileName.map((oneFileName) =>
      this.bucket.file(oneFileName),
    );
    try {
      await masFileBucket.map((oneFileBucket, i) =>
        oneFileBucket.save(uploadedFiles[i].buffer, {
          contentType: uploadedFiles[i].mimetype,
        }),
      );
    } catch (error) {
      throw new BadRequestException(error?.message);
    }

    return masFileBucket.map((oneFileBucket) => {
      return {
        imgUrl: `https://storage.googleapis.com/${this.bucket.name}/${oneFileBucket.name}`,
      };
    });
  }

  async removeFile(fileName: string): Promise<void> {
    const sanitizedFileName = fileName.replace(
      `https://storage.googleapis.com/${this.bucket.name}/`,
      '',
    );
    const file = this.bucket.file(sanitizedFileName);
    try {
      await file.delete();
      return;
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }
}
