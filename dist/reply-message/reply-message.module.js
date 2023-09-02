"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplyMessageModule = void 0;
const common_1 = require("@nestjs/common");
const reply_message_service_1 = require("./reply-message.service");
const reply_message_controller_1 = require("./reply-message.controller");
const prisma_service_1 = require("../prisma.service");
const message_service_1 = require("../message/message.service");
const chat_service_1 = require("../chat/chat.service");
const user_service_1 = require("../user/user.service");
const message_status_service_1 = require("../message_status/message_status.service");
let ReplyMessageModule = exports.ReplyMessageModule = class ReplyMessageModule {
};
exports.ReplyMessageModule = ReplyMessageModule = __decorate([
    (0, common_1.Module)({
        controllers: [reply_message_controller_1.ReplyMessageController],
        providers: [
            reply_message_service_1.ReplyMessageService,
            prisma_service_1.PrismaService,
            message_service_1.MessageService,
            chat_service_1.ChatService,
            user_service_1.UserService,
            message_status_service_1.MessageStatusService,
        ],
    })
], ReplyMessageModule);
//# sourceMappingURL=reply-message.module.js.map