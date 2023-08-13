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
exports.ContentImgService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ContentImgService = exports.ContentImgService = class ContentImgService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createOne(create) { }
    async createMany(filesUrl, messageId) {
        await this.prisma.contentImg.createMany({
            data: [
                ...filesUrl.map((oneFileUrl) => {
                    return { image_url: oneFileUrl.imgUrl, messageId: messageId };
                }),
            ],
        });
        const contentImg = await this.prisma.contentImg.findMany({
            where: {
                messageId: messageId,
            },
        });
        return contentImg;
    }
    async deleteContentImgDto(dto) {
        const deleteContentImg = await this.prisma.contentImg.delete({
            where: {
                id: (await this.prisma.contentImg.findFirst({
                    where: {
                        messageId: +dto.messageId,
                        image_url: dto.image_url,
                    },
                })).id,
            },
        });
        return deleteContentImg;
    }
    async findAllForMessage(messageId) {
        const allContentImgForMessage = await this.prisma.contentImg.findMany({
            where: {
                messageId: +messageId,
            },
        });
        return allContentImgForMessage;
    }
    async findDeleteContentImg(dto) {
        if (dto.messageId) {
            const allContentImgForMessage = await this.findAllForMessage(dto.messageId);
            const dataWhichDelete = allContentImgForMessage.filter((oneAllData) => {
                const isConsists = Object.keys(dto.image_url.filter((onedataNewUrl) => onedataNewUrl === oneAllData.image_url)).length !== 0;
                if (!isConsists)
                    return oneAllData;
            });
            return dataWhichDelete;
        }
    }
    async findAddContentImg(dto) {
        if (dto.messageId) {
            const allContentImgForMessage = await this.findAllForMessage(dto.messageId);
            const dataWhichAdd = dto.image_url.filter((oneNewDataUrl) => {
                const isConsists = Object.keys(allContentImgForMessage.filter((oneAllData) => oneAllData.image_url === oneNewDataUrl)).length !== 0;
                if (!isConsists)
                    return oneNewDataUrl;
            });
            return dataWhichAdd;
        }
    }
    async createContentImgs(dto) {
        const dataWhichAdd = await this.findAddContentImg(dto);
        if (dataWhichAdd) {
            await this.prisma.contentImg.createMany({
                data: [
                    ...dataWhichAdd.map((oneUrl) => {
                        return { messageId: +dto.messageId, image_url: oneUrl };
                    }),
                ],
            });
            const createContentImg = await this.prisma.contentImg.findMany({
                where: {
                    image_url: { in: dataWhichAdd.map((oneUrl) => oneUrl) },
                },
            });
            return createContentImg;
        }
    }
    async deleteContentImgs(dto) {
        const dataWhichDelete = await this.findDeleteContentImg(dto);
        if (dataWhichDelete.length > 0) {
            await this.prisma.contentImg.deleteMany({
                where: {
                    id: {
                        in: dataWhichDelete.map((oneContenImg) => oneContenImg.id),
                    },
                },
            });
            return dataWhichDelete;
        }
    }
    async deleteForMessage(messageId) {
        const allContentImg = await this.findAllForMessage(messageId);
        if (allContentImg.length > 0) {
            try {
                await this.prisma.contentImg.deleteMany({
                    where: {
                        id: { in: allContentImg.map((oneContenImg) => oneContenImg.id) },
                    },
                });
            }
            catch (error) {
                throw new common_1.BadRequestException(error?.message);
            }
            return allContentImg;
        }
    }
};
exports.ContentImgService = ContentImgService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContentImgService);
//# sourceMappingURL=content-img.service.js.map