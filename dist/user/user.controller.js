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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const auth_guard_1 = require("../auth/auth.guard");
const swagger_1 = require("@nestjs/swagger");
const userReturn_dto_1 = require("./Dto/userReturn.dto");
const updateUserAvatar_dto_1 = require("./Dto/updateUserAvatar.dto");
let UserController = exports.UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getUsers(req) {
        return this.userService.getAllUsers(req['user'].id);
    }
    async updateUserAvatar(dto) {
        return this.userService.updateUserAvatar(dto);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get All Users' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'users',
        type: [userReturn_dto_1.userReturnDto],
    }),
    (0, swagger_1.ApiBody)({ type: common_1.Req }),
    (0, common_1.Get)('allUsers'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update avatar path' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Ok',
    }),
    (0, swagger_1.ApiBody)({ type: common_1.Req }),
    (0, common_1.Post)('updateAvatar'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateUserAvatar_dto_1.updateUserAvatarDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserAvatar", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map