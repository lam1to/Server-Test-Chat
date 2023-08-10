/// <reference types="multer" />
import { StorageService } from './storage.service';
export declare class StorageController {
    private readonly storageService;
    constructor(storageService: StorageService);
    uploadStorageFile(file: Express.Multer.File): Promise<{
        imgUrl: string;
    }>;
}
