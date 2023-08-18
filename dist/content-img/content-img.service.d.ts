import { ContentImg } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateStorageUrlImg } from 'src/storage/dto/createStorageUrlImg.dto';
import { deleteContentImgDto } from './Dto/DeleteContentImg.dto';
import { messageUpdateWithImgDto } from 'src/message/dto/messageUpdateWithImg.dto';
export declare class ContentImgService {
    private prisma;
    constructor(prisma: PrismaService);
    createOne(): Promise<void>;
    createMany(filesUrl: CreateStorageUrlImg[], messageId: number): Promise<ContentImg[]>;
    deleteContentImgDto(dto: deleteContentImgDto): Promise<{
        messageId: number;
        id: number;
        image_url: string;
    } & {}>;
    findAllForMessage(messageId: string): Promise<ContentImg[]>;
    findDeleteContentImg(dto: messageUpdateWithImgDto): Promise<ContentImg[]>;
    findAddContentImg(dto: messageUpdateWithImgDto): Promise<string[]>;
    createContentImgs(dto: messageUpdateWithImgDto): Promise<({
        messageId: number;
        id: number;
        image_url: string;
    } & {})[]>;
    deleteContentImgs(dto: messageUpdateWithImgDto): Promise<({
        messageId: number;
        id: number;
        image_url: string;
    } & {})[]>;
    changePlace(dto: messageUpdateWithImgDto): Promise<void>;
    deleteForMessage(messageId: string): Promise<({
        messageId: number;
        id: number;
        image_url: string;
    } & {})[]>;
}
