/// <reference types="multer" />
import { ConfigService } from '@nestjs/config';
export declare class StorageService {
    private configService;
    private bucket;
    private storage;
    constructor(configService: ConfigService);
    private setFilename;
    uploadFile(uploadedFiles: Express.Multer.File[]): Promise<{
        imgUrl: string;
    }[]>;
    removeFile(fileName: string): Promise<void>;
}
