"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageStatusModule = void 0;
const common_1 = require("@nestjs/common");
const message_status_service_1 = require("./message_status.service");
const message_status_controller_1 = require("./message_status.controller");
const chat_service_1 = require("../chat/chat.service");
const prisma_service_1 = require("../prisma.service");
const message_service_1 = require("../message/message.service");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const jwt_config_1 = require("../config/jwt.config");
const user_service_1 = require("../user/user.service");
let MessageStatusModule = exports.MessageStatusModule = class MessageStatusModule {
};
exports.MessageStatusModule = MessageStatusModule = __decorate([
    (0, common_1.Module)({
        controllers: [message_status_controller_1.MessageStatusController],
        providers: [
            message_status_service_1.MessageStatusService,
            prisma_service_1.PrismaService,
            message_service_1.MessageService,
            chat_service_1.ChatService,
            user_service_1.UserService,
        ],
        imports: [
            config_1.ConfigModule.forRoot(),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: jwt_config_1.getJwtConfig,
            }),
        ],
    })
], MessageStatusModule);
//# sourceMappingURL=message_status.module.js.map