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
exports.updateIsReadMessageDto = exports.CountUnreadMessage = exports.returnMessageDto = exports.MessageReplyCreateDto = exports.MessageForward = exports.MessageForwardCreateDto = exports.MessageWithALLNameEC = exports.MessageWithImgReply = exports.MessageWithId = exports.MessageDto = void 0;
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
class MessageWithId extends MessageDto {
}
exports.MessageWithId = MessageWithId;
__decorate([
    (0, swagger_1.ApiProperty)({
        title: 'id',
        type: String,
        default: '1',
    }),
    __metadata("design:type", String)
], MessageWithId.prototype, "id", void 0);
class MessageWithImgReply extends MessageWithId {
}
exports.MessageWithImgReply = MessageWithImgReply;
class MessageWithALLNameEC extends MessageWithImgReply {
}
exports.MessageWithALLNameEC = MessageWithALLNameEC;
class MessageForwardCreateDto extends MessageWithId {
}
exports.MessageForwardCreateDto = MessageForwardCreateDto;
class MessageForward extends MessageWithImgReply {
}
exports.MessageForward = MessageForward;
class MessageReplyCreateDto extends MessageDto {
}
exports.MessageReplyCreateDto = MessageReplyCreateDto;
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
class CountUnreadMessage {
}
exports.CountUnreadMessage = CountUnreadMessage;
__decorate([
    (0, swagger_1.ApiProperty)({ title: 'chat id', type: String, default: '1' }),
    __metadata("design:type", Number)
], CountUnreadMessage.prototype, "chatId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        title: 'count unread message for this chat',
        type: String,
        default: '0',
    }),
    __metadata("design:type", Number)
], CountUnreadMessage.prototype, "count", void 0);
class updateIsReadMessageDto {
}
exports.updateIsReadMessageDto = updateIsReadMessageDto;
//# sourceMappingURL=messageDto.dto.js.map