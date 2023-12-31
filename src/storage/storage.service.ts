import { BadRequestException, Injectable } from '@nestjs/common';
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

  async uploadFiles(uploadedFiles: Express.Multer.File[]) {
    const masFileName: string[] = uploadedFiles.map((oneFile) =>
      this.setFilename(oneFile),
    );
    const masFileBucket = masFileName.map((oneFileName) =>
      this.bucket.file(oneFileName),
    );
    try {
      for (let i = 0; i < masFileBucket.length; i++) {
        await masFileBucket[i].save(uploadedFiles[i].buffer, {
          contentType: uploadedFiles[i].mimetype,
        });
      }
    } catch (error) {
      throw new BadRequestException(error?.message);
    }

    return masFileBucket.map((oneFileBucket) => {
      return {
        imgUrl: `https://storage.googleapis.com/${this.bucket.name}/${oneFileBucket.name}`,
      };
    });
  }

  async removeFile(imgUrl: string): Promise<void> {
    const sanitizedFileName = imgUrl.replace(
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

  async removeFiles(imgUrl: string[]): Promise<void> {
    const sanitizedFileName: string[] = imgUrl.map((oneImgUrl) => {
      return oneImgUrl.replace(
        `https://storage.googleapis.com/${this.bucket.name}/`,
        '',
      );
    });

    const files = sanitizedFileName.map((oneImgUrl) => {
      return this.bucket.file(oneImgUrl);
    });
    try {
      for (let i = 0; i < files.length; i++) {
        await files[i].delete();
      }
      return;
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  async uploadFile(uploadedFile: Express.Multer.File) {
    console.log('uploadedFile = ', uploadedFile);
    if (uploadedFile) {
      const fileName: string = this.setFilename(uploadedFile);

      const fileBucket = this.bucket.file(fileName);

      try {
        await fileBucket.save(uploadedFile.buffer, {
          contentType: uploadedFile.mimetype,
        });
      } catch (error) {
        throw new BadRequestException(error?.message);
      }
      return {
        imgUrl: `https://storage.googleapis.com/${this.bucket.name}/${fileBucket.name}`,
      };
    }
  }
}
