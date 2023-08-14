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
exports.CreateChatDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateChatDto {
}
exports.CreateChatDto = CreateChatDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        title: 'Id user who create',
        type: String,
        default: '1',
    }),
    __metadata("design:type", String)
], CreateChatDto.prototype, "userWhoCreateId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        title: 'mas id users',
        type: [String],
        default: `[${'1'},${'2'}]`,
    }),
    __metadata("design:type", Array)
], CreateChatDto.prototype, "idUsers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        title: 'Name chat',
        type: String,
        default: 'Group',
    }),
    __metadata("design:type", String)
], CreateChatDto.prototype, "name", void 0);
//# sourceMappingURL=createChat.dto.js.map