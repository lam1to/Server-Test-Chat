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
exports.GatewayGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const gateway_service_1 = require("./gateway.service");
const create_gateway_dto_1 = require("./dto/create-gateway.dto");
const update_gateway_dto_1 = require("./dto/update-gateway.dto");
const socket_io_1 = require("socket.io");
const join_dto_1 = require("./dto/join.dto");
const createChat_dto_1 = require("../chat/dto/createChat.dto");
let GatewayGateway = exports.GatewayGateway = class GatewayGateway {
    constructor(gatewayService) {
        this.gatewayService = gatewayService;
    }
    async create(createGatewayDto) {
        console.log('poluchino = ', createGatewayDto);
        return await this.gatewayService.create(createGatewayDto, this.server);
    }
    createChat(dto) {
        console.log('на создание чата в сокете пришло = ', dto);
        return this.gatewayService.createChat(dto, this.server);
    }
    findAll() {
        return this.gatewayService.findAll();
    }
    joinRoom(room) {
        return this.gatewayService.joinRoom(room, this.server);
    }
    findOne(id) {
        return this.gatewayService.findOne(id);
    }
    update(updateGatewayDto) {
        return this.gatewayService.update(updateGatewayDto.id, updateGatewayDto);
    }
    remove(id) {
        return this.gatewayService.remove(id);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], GatewayGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('createGateway'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_gateway_dto_1.CreateGatewayDto]),
    __metadata("design:returntype", Promise)
], GatewayGateway.prototype, "create", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('createChat'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createChat_dto_1.CreateChatDto]),
    __metadata("design:returntype", void 0)
], GatewayGateway.prototype, "createChat", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('findAllGateway'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GatewayGateway.prototype, "findAll", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('join'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [join_dto_1.JoinDto]),
    __metadata("design:returntype", void 0)
], GatewayGateway.prototype, "joinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('findOneGateway'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], GatewayGateway.prototype, "findOne", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('updateGateway'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_gateway_dto_1.UpdateGatewayDto]),
    __metadata("design:returntype", void 0)
], GatewayGateway.prototype, "update", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('removeGateway'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], GatewayGateway.prototype, "remove", null);
exports.GatewayGateway = GatewayGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ namespace: 'chatSocket', cors: { origin: '*' } }),
    __metadata("design:paramtypes", [gateway_service_1.GatewayService])
], GatewayGateway);
//# sourceMappingURL=gateway.gateway.js.map