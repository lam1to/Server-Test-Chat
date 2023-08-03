"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const common_1 = require("@nestjs/common");
const storage_1 = require("@google-cloud/storage");
const config_1 = require("@nestjs/config");
const path_1 = require("path");
let StorageService = exports.StorageService = class StorageService {
    constructor(configService) {
        this.configService = configService;
        this.storage = new storage_1.Storage({
            keyFilename: this.configService.get('googleCloud').keyFilename,
        });
        this.bucket = this.storage.bucket(this.configService.get('googleCloud').bucketName);
    }
    setFilename(uploadedFile) {
        const fileName = (0, path_1.parse)(uploadedFile.originalname);
        return `${fileName.name}-${Date.now()}${fileName.ext}`
            .replace(/^\.+/g, '')
            .replace(/^\/+/g, '')
            .replace(/[\r\n]/g, '_');
    }
    async uploadFile(uploadedFiles) {
        const masFileName = uploadedFiles.map((oneFile) => this.setFilename(oneFile));
        const masFileBucket = masFileName.map((oneFileName) => this.bucket.file(oneFileName));
        try {
            await masFileBucket.map((oneFileBucket, i) => oneFileBucket.save(uploadedFiles[i].buffer, {
                contentType: uploadedFiles[i].mimetype,
            }));
        }
        catch (error) {
            throw new common_1.BadRequestException(error?.message);
        }
        return masFileBucket.map((oneFileBucket) => {
            return {
                imgUrl: `https://storage.googleapis.com/${this.bucket.name}/${oneFileBucket.name}`,
            };
        });
    }
    async removeFile(fileName) {
        const sanitizedFileName = fileName.replace(`https://storage.googleapis.com/${this.bucket.name}/`, '');
        const file = this.bucket.file(sanitizedFileName);
        try {
            await file.delete();
            return;
        }
        catch (error) {
            throw new common_1.BadRequestException(error?.message);
        }
    }
};
exports.StorageService = StorageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], StorageService);
//# sourceMappingURL=storage.service.js.map