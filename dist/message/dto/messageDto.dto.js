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
exports.returnMessageDto = exports.MessageDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const createStorageUrlImg_dto_1 = require("../../storage/dto/createStorageUrlImg.dto");
class MessageDto {
}
exports.MessageDto = MessageDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        title: 'User id',
        type: String,
        default: '1',
    }),
    __metadata("design:type", String)
], MessageDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        title: 'Chat id',
        type: String,
        default: '1',
    }),
    __metadata("design:type", String)
], MessageDto.prototype, "chatId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        title: 'Content',
        type: String,
        default: 'Hi!',
    }),
    __metadata("design:type", String)
], MessageDto.prototype, "content", void 0);
class returnMessageDto extends MessageDto {
}
exports.returnMessageDto = returnMessageDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        title: 'Created_at',
        type: Date,
        default: Date.now(),
    }),
    __metadata("design:type", Date)
], returnMessageDto.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        title: 'Created_at',
        type: [createStorageUrlImg_dto_1.CreateStorageUrlImg],
        default: Date.now(),
    }),
    __metadata("design:type", Array)
], returnMessageDto.prototype, "masUrl", void 0);
//# sourceMappingURL=messageDto.dto.js.map