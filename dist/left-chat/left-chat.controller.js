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
exports.LeftChatController = void 0;
const common_1 = require("@nestjs/common");
const left_chat_service_1 = require("./left-chat.service");
const auth_guard_1 = require("../auth/auth.guard");
const swagger_1 = require("@nestjs/swagger");
let LeftChatController = exports.LeftChatController = class LeftChatController {
    constructor(leftChatService) {
        this.leftChatService = leftChatService;
    }
    findAll(req) {
        return this.leftChatService.findAll(req['user'].id);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all left chat' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'id chat',
        type: [Number],
    }),
    (0, swagger_1.ApiBody)({ type: common_1.Req }),
    (0, common_1.Get)('allLeftChat'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", void 0)
], LeftChatController.prototype, "findAll", null);
exports.LeftChatController = LeftChatController = __decorate([
    (0, swagger_1.ApiTags)('Left chat'),
    (0, common_1.Controller)('leftChat'),
    __metadata("design:paramtypes", [left_chat_service_1.LeftChatService])
], LeftChatController);
//# sourceMappingURL=left-chat.controller.js.map