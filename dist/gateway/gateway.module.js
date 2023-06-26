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
let GatewayModule = exports.GatewayModule = class GatewayModule {
};
exports.GatewayModule = GatewayModule = __decorate([
    (0, common_1.Module)({
        providers: [gateway_gateway_1.GatewayGateway, gateway_service_1.GatewayService, prisma_service_1.PrismaService, message_service_1.MessageService],
    })
], GatewayModule);
//# sourceMappingURL=gateway.module.js.map