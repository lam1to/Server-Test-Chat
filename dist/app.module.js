"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("./prisma.service");
const user_module_1 = require("./user/user.module");
const chat_module_1 = require("./chat/chat.module");
const message_module_1 = require("./message/message.module");
const gateway_module_1 = require("./gateway/gateway.module");
const block_user_module_1 = require("./block-user/block-user.module");
const left_chat_module_1 = require("./left-chat/left-chat.module");
const storage_module_1 = require("./storage/storage.module");
const content_img_module_1 = require("./content-img/content-img.module");
const configuration_1 = require("./config/configuration");
const reply_message_module_1 = require("./reply-message/reply-message.module");
const forward_message_module_1 = require("./forward-message/forward-message.module");
const message_status_module_1 = require("./message_status/message_status.module");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
            }),
            gateway_module_1.GatewayModule,
            reply_message_module_1.ReplyMessageModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            message_module_1.MessageModule,
            chat_module_1.ChatModule,
            block_user_module_1.BlockUserModule,
            left_chat_module_1.LeftChatModule,
            storage_module_1.StorageModule,
            content_img_module_1.ContentImgModule,
            forward_message_module_1.ForwardMessageModule,
            message_status_module_1.MessageStatusModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, prisma_service_1.PrismaService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map