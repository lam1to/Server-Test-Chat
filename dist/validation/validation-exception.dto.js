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
exports.ValidationExceptionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ValidationMessageDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'DTO field where error occurred', type: String }),
    __metadata("design:type", String)
], ValidationMessageDto.prototype, "field", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Description of the error', type: String }),
    __metadata("design:type", String)
], ValidationMessageDto.prototype, "error", void 0);
class ValidationExceptionDto {
}
exports.ValidationExceptionDto = ValidationExceptionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Status code of response', type: Number }),
    __metadata("design:type", Number)
], ValidationExceptionDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Info about the validation errors',
        type: ValidationMessageDto,
        isArray: true,
    }),
    __metadata("design:type", Array)
], ValidationExceptionDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Network message of response', type: String }),
    __metadata("design:type", String)
], ValidationExceptionDto.prototype, "error", void 0);
//# sourceMappingURL=validation-exception.dto.js.map