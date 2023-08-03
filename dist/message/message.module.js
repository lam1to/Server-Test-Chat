"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModule = void 0;
const common_1 = require("@nestjs/common");
const message_service_1 = require("./message.service");
const message_controller_1 = require("./message.controller");
const prisma_service_1 = require("../prisma.service");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const jwt_config_1 = require("../config/jwt.config");
const jwt_strategy_1 = require("../auth/jwt.strategy");
const storage_service_1 = require("../storage/storage.service");
const content_img_service_1 = require("../content-img/content-img.service");
const gateway_module_1 = require("../gateway/gateway.module");
const storage_module_1 = require("../storage/storage.module");
let MessageModule = exports.MessageModule = class MessageModule {
};
exports.MessageModule = MessageModule = __decorate([
    (0, common_1.Module)({
        controllers: [message_controller_1.MessageController],
        providers: [
            message_service_1.MessageService,
            jwt_strategy_1.JwtStrategy,
            prisma_service_1.PrismaService,
            content_img_service_1.ContentImgService,
            storage_service_1.StorageService,
        ],
        imports: [
            gateway_module_1.GatewayModule,
            storage_module_1.StorageModule,
            config_1.ConfigModule.forRoot(),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: jwt_config_1.getJwtConfig,
            }),
        ],
    })
], MessageModule);
//# sourceMappingURL=message.module.js.map