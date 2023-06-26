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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const message_service_1 = require("../message/message.service");
let GatewayService = exports.GatewayService = class GatewayService {
    constructor(prisma, messageS) {
        this.prisma = prisma;
        this.messageS = messageS;
    }
    async create(createGatewayDto, server) {
        const message = await this.messageS.createMessage(createGatewayDto);
        this.joinRoom({ chatId: createGatewayDto.chatId }, server);
        await server
            .to(createGatewayDto.chatId)
            .emit('message', createGatewayDto.content);
        return createGatewayDto.content;
    }
    findAll() {
        return `This action returns all gateway`;
    }
    findOne(id) {
        return `This action returns a #${id} gateway`;
    }
    async joinRoom(room, server) {
        await server.socketsJoin(room.chatId);
    }
    update(id, updateGatewayDto) {
        return `This action updates a #${id} gateway`;
    }
    remove(id) {
        return `This action removes a #${id} gateway`;
    }
};
exports.GatewayService = GatewayService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        message_service_1.MessageService])
], GatewayService);
//# sourceMappingURL=gateway.service.js.map