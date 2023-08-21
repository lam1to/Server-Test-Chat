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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const argon2_1 = require("argon2");
const jwt_1 = require("@nestjs/jwt");
let AuthService = exports.AuthService = class AuthService {
    constructor(prisma, jwt) {
        this.prisma = prisma;
        this.jwt = jwt;
    }
    async login(dto) {
        const user = await this.validataUser(dto);
        const tokens = await this.jwtToken(user.id);
        return { user: this.returnUserFields(user), ...tokens };
    }
    async registration(dto) {
        const oldUser = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });
        if (oldUser)
            throw new common_1.BadRequestException({ message: ['User already exists'] });
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                name: dto.name,
                lastName: dto.lastName,
                password: await (0, argon2_1.hash)(dto.password),
            },
        });
        const tokens = await this.jwtToken(user.id);
        return { user: this.returnUserFields(user), ...tokens };
    }
    async getNewTokens(refreshToken) {
        const res = await this.jwt.verifyAsync(refreshToken);
        if (!res)
            throw new common_1.UnauthorizedException({
                message: ['Invalid refresh token'],
                statusCode: 401,
            });
        const user = await this.prisma.user.findUnique({
            where: {
                id: res.id,
            },
        });
        const tokens = await this.jwtToken(user.id);
        return { user: this.returnUserFields(user), ...tokens };
    }
    async jwtToken(userId) {
        const data = { id: userId };
        const accessToken = this.jwt.sign(data, {
            expiresIn: '1h',
        });
        const refreshToken = this.jwt.sign(data, {
            expiresIn: '7d',
        });
        return { accessToken, refreshToken };
    }
    returnUserFields(user) {
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            lastName: user.lastName,
            avatar_path: user.avatarPath,
        };
    }
    async validataUser(dto) {
        console.log('зашли в validate');
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });
        if (!user)
            throw new common_1.UnauthorizedException({
                message: ['No users with this email found'],
                statusCode: 401,
            });
        const isValid = await (0, argon2_1.verify)(user.password, dto.password);
        if (!isValid) {
            throw new common_1.UnauthorizedException({
                message: ['Invalid password'],
                statusCode: 401,
            });
        }
        return user;
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map