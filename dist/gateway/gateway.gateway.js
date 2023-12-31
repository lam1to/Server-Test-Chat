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
const update_gateway_dto_1 = require("./dto/update-gateway.dto");
const socket_io_1 = require("socket.io");
const join_dto_1 = require("./dto/join.dto");
const createChat_dto_1 = require("../chat/dto/createChat.dto");
const messageUpdateDto_dto_1 = require("../message/dto/messageUpdateDto.dto");
const messageDelete_dto_1 = require("../message/dto/messageDelete.dto");
const create_block_user_dto_1 = require("../block-user/dto/create-block-user.dto");
const LeftChat_dto_1 = require("../left-chat/dto/LeftChat.dto");
const messageDto_dto_1 = require("../message/dto/messageDto.dto");
const common_1 = require("@nestjs/common");
const messageCreateWithImg_dto_1 = require("../message/dto/messageCreateWithImg.dto");
const messageUpdateWithImg_dto_1 = require("../message/dto/messageUpdateWithImg.dto");
const swagger_1 = require("@nestjs/swagger");
let GatewayGateway = exports.GatewayGateway = class GatewayGateway {
    constructor(gatewayService) {
        this.gatewayService = gatewayService;
    }
    async create(messageCreateDto) {
        return await this.gatewayService.create(messageCreateDto, this.server);
    }
    async createWithImg(messageWithImgCreateDto) {
        console.log('зашло в gateWay');
        console.log('получили такие данные = ', messageWithImgCreateDto);
        await this.gatewayService.createWithImg(messageWithImgCreateDto, this.server);
    }
    async createReply(messageCreateDto) {
        return await this.gatewayService.createReply(messageCreateDto, this.server);
    }
    async createReplyWithImg(messageReplyWithImgCreateDto) {
        console.log('зашло в gateWay');
        console.log('получили такие данные = ', messageReplyWithImgCreateDto);
        await this.gatewayService.createReplyWithImg(messageReplyWithImgCreateDto, this.server);
    }
    async createForwardMessage(dto) {
        return await this.gatewayService.createForwardMessage(dto, this.server);
    }
    async createForwardMessageWithImg(dto) {
        console.log('зашло в gateWay');
        console.log('получили такие данные = ', dto);
        await this.gatewayService.createForwardMessageWithImg(dto, this.server);
    }
    async editMessageWithImg(dto) {
        console.log('зашло в gateWay');
        console.log('получили такие данные = ', messageCreateWithImg_dto_1.messageWithImgCreateDto);
        await this.gatewayService.editMessageWithImg(dto, this.server);
    }
    createChat(dto) {
        console.log('на создание чата в сокете пришло = ', dto);
        return this.gatewayService.createChat(dto, this.server);
    }
    deleteChat(id) {
        return this.gatewayService.deleteChat(id, this.server);
    }
    deleteMessage(dto) {
        console.log('на сервер получили dto = ', dto);
        return this.gatewayService.deleteMessage(dto, this.server);
    }
    updateMessage(dto) {
        return this.gatewayService.updateMessage(dto, this.server);
    }
    findAll() {
        return this.gatewayService.findAll();
    }
    createBlockUser(dto) {
        return this.gatewayService.createBlockUser(dto, this.server);
    }
    removeBlockUser(dto) {
        return this.gatewayService.removeBlockUser(dto, this.server);
    }
    createLeftChat(dto) {
        return this.gatewayService.createLeftChat(dto, this.server);
    }
    removeLeftChat(dto) {
        return this.gatewayService.removeLeftChat(dto, this.server);
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
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [messageDto_dto_1.MessageDto]),
    __metadata("design:returntype", Promise)
], GatewayGateway.prototype, "create", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('createMessageWithImg'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [messageCreateWithImg_dto_1.messageWithImgCreateDto]),
    __metadata("design:returntype", Promise)
], GatewayGateway.prototype, "createWithImg", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('createReplyMessage'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [messageDto_dto_1.MessageReplyCreateDto]),
    __metadata("design:returntype", Promise)
], GatewayGateway.prototype, "createReply", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('createReplyMessageWithImg'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [messageCreateWithImg_dto_1.messageReplyWithImgCreateDto]),
    __metadata("design:returntype", Promise)
], GatewayGateway.prototype, "createReplyWithImg", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('createForwardMessage'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [messageDto_dto_1.MessageForwardCreateDto]),
    __metadata("design:returntype", Promise)
], GatewayGateway.prototype, "createForwardMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('createForwardMessageWithImg'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [messageCreateWithImg_dto_1.messageForwardWithImgReplyDto]),
    __metadata("design:returntype", Promise)
], GatewayGateway.prototype, "createForwardMessageWithImg", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('updateMessageWithImg'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [messageUpdateWithImg_dto_1.messageUpdateWithImgDto]),
    __metadata("design:returntype", Promise)
], GatewayGateway.prototype, "editMessageWithImg", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('createChat'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createChat_dto_1.CreateChatDto]),
    __metadata("design:returntype", void 0)
], GatewayGateway.prototype, "createChat", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('deleteChat'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GatewayGateway.prototype, "deleteChat", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('deleteMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [messageDelete_dto_1.MessageDeleteDto]),
    __metadata("design:returntype", void 0)
], GatewayGateway.prototype, "deleteMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('updateMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [messageUpdateDto_dto_1.MessageUpdateDto]),
    __metadata("design:returntype", void 0)
], GatewayGateway.prototype, "updateMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('findAllGateway'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GatewayGateway.prototype, "findAll", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('createBlockUser'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_block_user_dto_1.CreateBlockUserDto]),
    __metadata("design:returntype", void 0)
], GatewayGateway.prototype, "createBlockUser", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('removeBlockUser'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_block_user_dto_1.CreateBlockUserDto]),
    __metadata("design:returntype", void 0)
], GatewayGateway.prototype, "removeBlockUser", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('createLeftChat'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LeftChat_dto_1.LeftChatDto]),
    __metadata("design:returntype", void 0)
], GatewayGateway.prototype, "createLeftChat", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('removeLeftChat'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LeftChat_dto_1.LeftChatDto]),
    __metadata("design:returntype", void 0)
], GatewayGateway.prototype, "removeLeftChat", null);
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
    (0, swagger_1.ApiTags)('ChatSocket'),
    (0, websockets_1.WebSocketGateway)({ namespace: 'chatSocket', cors: { origin: '*' } }),
    __metadata("design:paramtypes", [gateway_service_1.GatewayService])
], GatewayGateway);
//# sourceMappingURL=gateway.gateway.js.map