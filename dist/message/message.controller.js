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
exports.MessageController = void 0;
const common_1 = require("@nestjs/common");
const message_service_1 = require("./message.service");
const messageCreateDto_dto_1 = require("./dto/messageCreateDto.dto");
const messageUpdateDto_dto_1 = require("./dto/messageUpdateDto.dto");
const auth_guard_1 = require("../auth/auth.guard");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const gateway_gateway_1 = require("../gateway/gateway.gateway");
const storage_service_1 = require("../storage/storage.service");
const content_img_service_1 = require("../content-img/content-img.service");
let MessageController = exports.MessageController = class MessageController {
    constructor(messageService, gateway, storage, contentImg) {
        this.messageService = messageService;
        this.gateway = gateway;
        this.storage = storage;
        this.contentImg = contentImg;
    }
    async createMessage(dto) {
        return this.messageService.createMessage(dto);
    }
    async getAllForChat(id, req) {
        const idUser = req['user'].id;
        return this.messageService.getAllForChat(id, idUser);
    }
    async updateMessage(dto) {
        return this.messageService.updateMessage(dto);
    }
    async uploadFile(files, dto) {
        return this.messageService.createMessageWithImg(dto, files, this.gateway, this.storage, this.contentImg);
    }
};
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [messageCreateDto_dto_1.MessageCreateDto]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "createMessage", null);
__decorate([
    (0, common_1.Get)('getAllForChat/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Request]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getAllForChat", null);
__decorate([
    (0, common_1.Patch)('update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [messageUpdateDto_dto_1.MessageUpdateDto]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "updateMessage", null);
__decorate([
    (0, common_1.Post)('createWithImg'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 10, {
        storage: (0, multer_1.memoryStorage)(),
        limits: { fileSize: 15728640 },
        fileFilter: (req, file, callback) => {
            return file.mimetype.match(/image\/(jpg|jpeg|png|gif|webp)$/)
                ? callback(null, true)
                : callback(new common_1.BadRequestException('Invalid file type or maximum size limit exceeded'), false);
        },
    })),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, messageCreateDto_dto_1.MessageCreateDto]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "uploadFile", null);
exports.MessageController = MessageController = __decorate([
    (0, common_1.Controller)('message'),
    __metadata("design:paramtypes", [message_service_1.MessageService,
        gateway_gateway_1.GatewayGateway,
        storage_service_1.StorageService,
        content_img_service_1.ContentImgService])
], MessageController);
//# sourceMappingURL=message.controller.js.map