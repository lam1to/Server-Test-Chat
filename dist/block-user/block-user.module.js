"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockUserModule = void 0;
const common_1 = require("@nestjs/common");
const block_user_service_1 = require("./block-user.service");
const block_user_controller_1 = require("./block-user.controller");
const jwt_strategy_1 = require("../auth/jwt.strategy");
const prisma_service_1 = require("../prisma.service");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const jwt_config_1 = require("../config/jwt.config");
let BlockUserModule = exports.BlockUserModule = class BlockUserModule {
};
exports.BlockUserModule = BlockUserModule = __decorate([
    (0, common_1.Module)({
        controllers: [block_user_controller_1.BlockUserController],
        providers: [block_user_service_1.BlockUserService, jwt_strategy_1.JwtStrategy, prisma_service_1.PrismaService],
        imports: [
            config_1.ConfigModule.forRoot(),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: jwt_config_1.getJwtConfig,
            }),
        ],
    })
], BlockUserModule);
//# sourceMappingURL=block-user.module.js.map