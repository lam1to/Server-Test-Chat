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
const messageDto_dto_1 = require("./dto/messageDto.dto");
const auth_guard_1 = require("../auth/auth.guard");
const content_img_service_1 = require("../content-img/content-img.service");
const swagger_1 = require("@nestjs/swagger");
const messageUpdateDto_dto_1 = require("./dto/messageUpdateDto.dto");
let MessageController = exports.MessageController = class MessageController {
    constructor(messageService, contentImg) {
        this.messageService = messageService;
        this.contentImg = contentImg;
    }
    async createMessage(dto) {
        return this.messageService.createMessage(dto);
    }
    async getAllForChat(id, req) {
        const idUser = req['user'].id;
        return this.messageService.getAllForChat(id, idUser);
    }
    async getOnePartMessage(limitCount, chatId, partId, req) {
        console.log('limit count message = ', limitCount, 'чат с таким id = ', chatId, ' part такое - ', partId);
        return this.messageService.getOnePartMessage(limitCount, chatId, partId, req['user'].id);
    }
    async updateMessage(dto) {
        return this.messageService.updateMessage(dto);
    }
    async getLastMessage(req) {
        return this.messageService.getLastMessage(req['user'].id);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create message' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'message',
        type: messageDto_dto_1.returnMessageDto,
    }),
    (0, swagger_1.ApiBody)({ type: messageDto_dto_1.MessageDto }),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [messageDto_dto_1.MessageDto]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "createMessage", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get All messages for chat' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'messages',
        type: [messageDto_dto_1.returnMessageDto],
    }),
    (0, common_1.Get)('getAllForChat/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Request]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getAllForChat", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get one part message for chat' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'messages',
        type: [messageDto_dto_1.returnMessageDto],
    }),
    (0, common_1.Get)('getMessage/limit=:id/chat=:id2/part=:id3'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('id2')),
    __param(2, (0, common_1.Param)('id3')),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Request]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getOnePartMessage", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update message' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'update message',
        type: messageDto_dto_1.returnMessageDto,
    }),
    (0, swagger_1.ApiBody)({ type: messageUpdateDto_dto_1.MessageUpdateDto }),
    (0, common_1.Patch)('update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [messageUpdateDto_dto_1.MessageUpdateDto]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "updateMessage", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get last messages' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'last messages for user',
        type: messageDto_dto_1.MessageDto,
    }),
    (0, swagger_1.ApiBody)({ type: common_1.Req }),
    (0, common_1.Get)('lastMessage'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getLastMessage", null);
exports.MessageController = MessageController = __decorate([
    (0, swagger_1.ApiTags)('Message'),
    (0, common_1.Controller)('message'),
    __metadata("design:paramtypes", [message_service_1.MessageService,
        content_img_service_1.ContentImgService])
], MessageController);
//# sourceMappingURL=message.controller.js.map