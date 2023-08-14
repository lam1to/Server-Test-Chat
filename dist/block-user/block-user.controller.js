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
exports.BlockUserController = void 0;
const common_1 = require("@nestjs/common");
const block_user_service_1 = require("./block-user.service");
const create_block_user_dto_1 = require("./dto/create-block-user.dto");
const auth_guard_1 = require("../auth/auth.guard");
const swagger_1 = require("@nestjs/swagger");
const blockUser_dto_1 = require("./dto/blockUser.dto");
let BlockUserController = exports.BlockUserController = class BlockUserController {
    constructor(blockUserService) {
        this.blockUserService = blockUserService;
    }
    create(createBlockUserDto) {
        console.log('зашли в create ', createBlockUserDto);
        return this.blockUserService.create(createBlockUserDto);
    }
    remove(req, id) {
        return this.blockUserService.remove(+req['user'].id, +id);
    }
    findAllBlocked(req) {
        return this.blockUserService.findAllBlocked(+req['user'].id);
    }
    findAllBlocker(req) {
        return this.blockUserService.findAllBlocker(+req['user'].id);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'create block user' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'id who blocked, id who was blocked',
        type: blockUser_dto_1.blockUserDto,
    }),
    (0, swagger_1.ApiBody)({ type: create_block_user_dto_1.CreateBlockUserDto }),
    (0, common_1.Post)('createBlockUser'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_block_user_dto_1.CreateBlockUserDto]),
    __metadata("design:returntype", void 0)
], BlockUserController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'remove block user' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'id who blocked, id who was blocked',
        type: blockUser_dto_1.blockUserDto,
    }),
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, String]),
    __metadata("design:returntype", void 0)
], BlockUserController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all blocked for user' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'id who blocked',
        type: [Number],
    }),
    (0, swagger_1.ApiBody)({ type: common_1.Req }),
    (0, common_1.Get)('findAllBlockedForUser'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", void 0)
], BlockUserController.prototype, "findAllBlocked", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all blocker for user' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'id who blocker',
        type: [Number],
    }),
    (0, swagger_1.ApiBody)({ type: common_1.Req }),
    (0, common_1.Get)('findAllBlockerForUser'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", void 0)
], BlockUserController.prototype, "findAllBlocker", null);
exports.BlockUserController = BlockUserController = __decorate([
    (0, swagger_1.ApiTags)('Block user'),
    (0, common_1.Controller)('blockUser'),
    __metadata("design:paramtypes", [block_user_service_1.BlockUserService])
], BlockUserController);
//# sourceMappingURL=block-user.controller.js.map