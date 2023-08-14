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
exports.removeFileDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class removeFileDto {
}
exports.removeFileDto = removeFileDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        title: 'img url ',
        type: String,
        default: 'https://storage.googleapis.com/img-test-chat/174034-zamasu-goku-vegeta-multfilm-purpur-7680x4320-1691965801606.jpg',
    }),
    __metadata("design:type", String)
], removeFileDto.prototype, "image_url", void 0);
//# sourceMappingURL=removeFile.dto.js.map