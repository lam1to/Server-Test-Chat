"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayModule = void 0;
const common_1 = require("@nestjs/common");
const gateway_service_1 = require("./gateway.service");
const gateway_gateway_1 = require("./gateway.gateway");
const prisma_service_1 = require("../prisma.service");
const message_service_1 = require("../message/message.service");
const chat_service_1 = require("../chat/chat.service");
const block_user_service_1 = require("../block-user/block-user.service");
const left_chat_service_1 = require("../left-chat/left-chat.service");
const content_img_service_1 = require("../content-img/content-img.service");
const storage_service_1 = require("../storage/storage.service");
const user_service_1 = require("../user/user.service");
const reply_message_service_1 = require("../reply-message/reply-message.service");
const forward_message_service_1 = require("../forward-message/forward-message.service");
const message_status_service_1 = require("../message_status/message_status.service");
let GatewayModule = exports.GatewayModule = class GatewayModule {
};
exports.GatewayModule = GatewayModule = __decorate([
    (0, common_1.Module)({
        providers: [
            gateway_gateway_1.GatewayGateway,
            gateway_service_1.GatewayService,
            message_service_1.MessageService,
            chat_service_1.ChatService,
            prisma_service_1.PrismaService,
            block_user_service_1.BlockUserService,
            left_chat_service_1.LeftChatService,
            content_img_service_1.ContentImgService,
            storage_service_1.StorageService,
            user_service_1.UserService,
            reply_message_service_1.ReplyMessageService,
            forward_message_service_1.ForwardMessageService,
            message_status_service_1.MessageStatusService,
        ],
        exports: [gateway_gateway_1.GatewayGateway],
    })
], GatewayModule);
//# sourceMappingURL=gateway.module.js.map