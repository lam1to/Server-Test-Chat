"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModule = void 0;
const common_1 = require("@nestjs/common");
const chat_service_1 = require("./chat.service");
const chat_controller_1 = require("./chat.controller");
const prisma_service_1 = require("../prisma.service");
const jwt_strategy_1 = require("../auth/jwt.strategy");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const jwt_config_1 = require("../config/jwt.config");
let ChatModule = exports.ChatModule = class ChatModule {
};
exports.ChatModule = ChatModule = __decorate([
    (0, common_1.Module)({
        controllers: [chat_controller_1.ChatController],
        providers: [chat_service_1.ChatService, jwt_strategy_1.JwtStrategy, prisma_service_1.PrismaService],
        imports: [
            config_1.ConfigModule.forRoot(),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: jwt_config_1.getJwtConfig,
            }),
        ],
    })
], ChatModule);
//# sourceMappingURL=chat.module.js.map