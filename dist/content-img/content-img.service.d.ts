import { ContentImg } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateStorageUrlImg } from 'src/storage/dto/createStorageUrlImg.dto';
import { deleteContentImgDto } from './Dto/DeleteContentImg.dto';
import { messageUpdateWithImgDto } from 'src/message/dto/messageUpdateWithImg.dto';
export declare class ContentImgService {
    private prisma;
    constructor(prisma: PrismaService);
    createOne(create: any): Promise<void>;
    createMany(filesUrl: CreateStorageUrlImg[], messageId: number): Promise<ContentImg[]>;
    deleteContentImgDto(dto: deleteContentImgDto): Promise<{
        id: number;
        messageId: number;
        image_url: string;
    } & {}>;
    findAllForMessage(messageId: string): Promise<ContentImg[]>;
    findDeleteContentImg(dto: messageUpdateWithImgDto): Promise<ContentImg[]>;
    findAddContentImg(dto: messageUpdateWithImgDto): Promise<string[]>;
    createContentImgs(dto: messageUpdateWithImgDto): Promise<({
        id: number;
        messageId: number;
        image_url: string;
    } & {})[]>;
    deleteContentImgs(dto: messageUpdateWithImgDto): Promise<({
        id: number;
        messageId: number;
        image_url: string;
    } & {})[]>;
    deleteForMessage(messageId: string): Promise<({
        id: number;
        messageId: number;
        image_url: string;
    } & {})[]>;
}
