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
let MessageController = exports.MessageController = class MessageController {
    constructor(messageService) {
        this.messageService = messageService;
    }
    async createMessage(dto) {
        return this.messageService.createMessage(dto);
    }
    async getAllForChat(id) {
        return this.messageService.getAllForChat(id);
    }
    async updateMessage(dto) {
        return this.messageService.updateMessage(dto);
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
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getAllForChat", null);
__decorate([
    (0, common_1.Patch)('update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [messageUpdateDto_dto_1.MessageUpdateDto]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "updateMessage", null);
exports.MessageController = MessageController = __decorate([
    (0, common_1.Controller)('message'),
    __metadata("design:paramtypes", [message_service_1.MessageService])
], MessageController);
//# sourceMappingURL=message.controller.js.map