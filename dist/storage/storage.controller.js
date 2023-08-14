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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageController = void 0;
const common_1 = require("@nestjs/common");
const storage_service_1 = require("./storage.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const removeFile_dto_1 = require("./dto/removeFile.dto");
const swagger_1 = require("@nestjs/swagger");
const createStorageUrlImg_dto_1 = require("./dto/createStorageUrlImg.dto");
const uploadStorageFile_dto_1 = require("./dto/uploadStorageFile.dto");
let StorageController = exports.StorageController = class StorageController {
    constructor(storageService) {
        this.storageService = storageService;
    }
    async uploadStorageFile(file) {
        return this.storageService.uploadFile(file);
    }
    async remove(dto) {
        return this.storageService.removeFile(dto.image_url);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Upload new img in google storage' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'url',
        type: createStorageUrlImg_dto_1.CreateStorageUrlImg,
    }),
    (0, swagger_1.ApiBody)({ type: uploadStorageFile_dto_1.uploadStorageFileDto }),
    (0, common_1.Post)('uploadStorageFile'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.memoryStorage)(),
        limits: { fileSize: 15728640 },
        fileFilter: (req, file, callback) => {
            return file.mimetype.match(/image\/(jpg|jpeg|png|gif|webp)$/)
                ? callback(null, true)
                : callback(new common_1.BadRequestException('Invalid file type or maximum size limit exceeded'), false);
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StorageController.prototype, "uploadStorageFile", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'remove one file in google storage' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'OK',
    }),
    (0, swagger_1.ApiBody)({ type: removeFile_dto_1.removeFileDto }),
    (0, common_1.Post)('removeOneFile'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [removeFile_dto_1.removeFileDto]),
    __metadata("design:returntype", Promise)
], StorageController.prototype, "remove", null);
exports.StorageController = StorageController = __decorate([
    (0, swagger_1.ApiTags)('storage'),
    (0, common_1.Controller)('storage'),
    __metadata("design:paramtypes", [storage_service_1.StorageService])
], StorageController);
//# sourceMappingURL=storage.controller.js.map