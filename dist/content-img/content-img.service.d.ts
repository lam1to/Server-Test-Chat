import { ContentImg } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateStorageUrlImg } from 'src/storage/dto/createStorageUrlImg.dto';
export declare class ContentImgService {
    private prisma;
    constructor(prisma: PrismaService);
    create(filesUrl: CreateStorageUrlImg[], messageId: number): Promise<ContentImg[]>;
}
