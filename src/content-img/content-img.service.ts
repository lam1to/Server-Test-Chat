import { Injectable } from '@nestjs/common';
import { ContentImg } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateStorageUrlImg } from 'src/storage/dto/createStorageUrlImg.dto';

@Injectable()
export class ContentImgService {
  constructor(private prisma: PrismaService) {}

  async create(
    filesUrl: CreateStorageUrlImg[],
    messageId: number,
  ): Promise<ContentImg[]> {
    console.log('зашли в создание contentImg');
    await this.prisma.contentImg.createMany({
      data: [
        ...filesUrl.map((oneFileUrl) => {
          return { image_url: oneFileUrl.imgUrl, messageId: messageId };
        }),
      ],
    });
    console.log('прошли создание ');
    const contentImg: ContentImg[] = await this.prisma.contentImg.findMany({
      where: {
        messageId: messageId,
      },
    });
    console.log('прошли поиск ');
    return contentImg;
  }
}
