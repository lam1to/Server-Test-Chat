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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_dto_1 = require("./dto/auth.dto");
const reg_dto_1 = require("./dto/reg.dto");
const refresh_dto_1 = require("./dto/refresh.dto");
const auth_guard_1 = require("./auth.guard");
const swagger_1 = require("@nestjs/swagger");
const returnData_dto_1 = require("./dto/returnData.dto");
const validation_exception_dto_1 = require("../validation/validation-exception.dto");
let AuthController = exports.AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async registration(dto) {
        return this.authService.registration(dto);
    }
    async login(dto) {
        return this.authService.login(dto);
    }
    async getNewTokens(req) {
        const [type, token] = req.headers['authorization'].split(' ') ?? [];
        const refreshT = type === 'Bearer' ? token : undefined;
        return this.authService.getNewTokens(refreshT);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Registration' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'user, tokens',
        type: returnData_dto_1.returnDataDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Validation failed',
        type: validation_exception_dto_1.ValidationExceptionDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'User already exists',
        type: common_1.UnauthorizedException,
    }),
    (0, swagger_1.ApiBody)({ type: reg_dto_1.RegDto }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('registration'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reg_dto_1.RegDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registration", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Login' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'user, tokens',
        type: returnData_dto_1.returnDataDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Invalid credentials',
        type: common_1.UnauthorizedException,
    }),
    (0, swagger_1.ApiBody)({ type: auth_dto_1.AuthDto }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'getNewTokens' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'user, tokens',
        type: returnData_dto_1.returnDataDto,
    }),
    (0, swagger_1.ApiBody)({ type: refresh_dto_1.RefreshDto }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('login/token'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getNewTokens", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map