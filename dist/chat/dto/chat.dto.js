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
exports.deleteChat = exports.chatWithUserDto = exports.chatDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const userReturn_dto_1 = require("../../user/Dto/userReturn.dto");
class chatDto {
}
exports.chatDto = chatDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        title: 'id',
        type: Number,
        default: '1',
    }),
    __metadata("design:type", Number)
], chatDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        title: 'Type',
        type: String,
        default: 'DM',
    }),
    __metadata("design:type", String)
], chatDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        title: 'Created at',
        type: Date,
        default: Date.now(),
    }),
    __metadata("design:type", Date)
], chatDto.prototype, "createdAt", void 0);
class chatWithUserDto extends chatDto {
}
exports.chatWithUserDto = chatWithUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        title: 'users',
        type: [userReturn_dto_1.userReturnDto],
        default: [],
    }),
    __metadata("design:type", Array)
], chatWithUserDto.prototype, "users", void 0);
class deleteChat {
}
exports.deleteChat = deleteChat;
__decorate([
    (0, swagger_1.ApiProperty)({
        title: 'chat',
        type: chatDto,
        default: {},
    }),
    __metadata("design:type", chatDto)
], deleteChat.prototype, "deleteChat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        title: 'id user who was in chat',
        type: [String],
        default: `[${'1'},${'2'}]`,
    }),
    __metadata("design:type", Array)
], deleteChat.prototype, "userInChatId", void 0);
//# sourceMappingURL=chat.dto.js.map