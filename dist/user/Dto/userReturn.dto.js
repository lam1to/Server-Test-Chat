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
exports.userReturnDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class userReturnDto {
}
exports.userReturnDto = userReturnDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        title: 'id',
        type: Number,
        default: 1,
    }),
    __metadata("design:type", Number)
], userReturnDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        title: 'Created_at',
        type: Date,
        default: Date.now(),
    }),
    __metadata("design:type", Date)
], userReturnDto.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        title: 'Update_at',
        type: Date,
        default: Date.now(),
    }),
    __metadata("design:type", Date)
], userReturnDto.prototype, "update_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        title: 'Email',
        type: String,
        default: 'xtxtx96@mail.ru',
    }),
    __metadata("design:type", String)
], userReturnDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        title: 'Password',
        type: String,
        default: '********',
    }),
    __metadata("design:type", String)
], userReturnDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        title: 'Name',
        type: String,
        default: 'Daniil',
    }),
    __metadata("design:type", String)
], userReturnDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        title: 'LastName',
        type: String,
        default: 'Panteleev',
    }),
    __metadata("design:type", String)
], userReturnDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        title: 'Avatar path',
        type: String,
        default: 'C:/Users/Lam1to/Pictures/testChatDefaultAvatar.jpg',
    }),
    __metadata("design:type", String)
], userReturnDto.prototype, "avatar_path", void 0);
//# sourceMappingURL=userReturn.dto.js.map