/// <reference types="multer" />
import { StorageService } from './storage.service';
import { removeFileDto } from './dto/removeFile.dto';
export declare class StorageController {
    private readonly storageService;
    constructor(storageService: StorageService);
    uploadStorageFile(file: Express.Multer.File): Promise<{
        imgUrl: string;
    }>;
    remove(dto: removeFileDto): Promise<void>;
}
