import { BadRequestException, Injectable } from '@nestjs/common';
import { ContentImg } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateStorageUrlImg } from 'src/storage/dto/createStorageUrlImg.dto';
import { deleteContentImgDto } from './Dto/DeleteContentImg.dto';
import { messageUpdateWithImgDto } from 'src/message/dto/messageUpdateWithImg.dto';

@Injectable()
export class ContentImgService {
  constructor(private prisma: PrismaService) {}

  async createOne() {}
  async createMany(
    filesUrl: CreateStorageUrlImg[],
    messageId: number,
  ): Promise<ContentImg[]> {
    await this.prisma.contentImg.createMany({
      data: [
        ...filesUrl.map((oneFileUrl) => {
          return { image_url: oneFileUrl.imgUrl, messageId: messageId };
        }),
      ],
    });
    const contentImg: ContentImg[] = await this.prisma.contentImg.findMany({
      where: {
        messageId: messageId,
      },
    });
    return contentImg;
  }

  async deleteContentImgDto(dto: deleteContentImgDto) {
    const deleteContentImg: ContentImg = await this.prisma.contentImg.delete({
      where: {
        id: (
          await this.prisma.contentImg.findFirst({
            where: {
              messageId: +dto.messageId,
              image_url: dto.image_url,
            },
          })
        ).id,
      },
    });
    return deleteContentImg;
  }

  async findAllForMessage(messageId: string): Promise<ContentImg[]> {
    const allContentImgForMessage: ContentImg[] =
      await this.prisma.contentImg.findMany({
        where: {
          messageId: +messageId,
        },
      });
    return allContentImgForMessage;
  }

  async findDeleteContentImg(
    dto: messageUpdateWithImgDto,
  ): Promise<ContentImg[]> {
    if (dto.messageId) {
      const allContentImgForMessage: ContentImg[] =
        await this.findAllForMessage(dto.messageId);
      const dataWhichDelete: ContentImg[] = allContentImgForMessage.filter(
        (oneAllData) => {
          const isConsists =
            Object.keys(
              dto.image_url.filter(
                (onedataNewUrl) => onedataNewUrl === oneAllData.image_url,
              ),
            ).length !== 0;
          if (!isConsists) return oneAllData;
        },
      );
      return dataWhichDelete;
    }
  }

  async findAddContentImg(dto: messageUpdateWithImgDto): Promise<string[]> {
    if (dto.messageId) {
      const allContentImgForMessage: ContentImg[] =
        await this.findAllForMessage(dto.messageId);
      const dataWhichAdd: string[] = dto.image_url.filter((oneNewDataUrl) => {
        const isConsists =
          Object.keys(
            allContentImgForMessage.filter(
              (oneAllData) => oneAllData.image_url === oneNewDataUrl,
            ),
          ).length !== 0;

        if (!isConsists) return oneNewDataUrl;
      });
      return dataWhichAdd;
    }
  }

  async createContentImgs(dto: messageUpdateWithImgDto) {
    const dataWhichAdd: string[] = await this.findAddContentImg(dto);
    if (dataWhichAdd) {
      await this.prisma.contentImg.createMany({
        data: [
          ...dataWhichAdd.map((oneUrl) => {
            return { messageId: +dto.messageId, image_url: oneUrl };
          }),
        ],
      });
      const createContentImg: ContentImg[] =
        await this.prisma.contentImg.findMany({
          where: {
            image_url: { in: dataWhichAdd.map((oneUrl) => oneUrl) },
          },
        });
      return createContentImg;
    }
  }

  async deleteContentImgs(dto: messageUpdateWithImgDto) {
    const dataWhichDelete: ContentImg[] = await this.findDeleteContentImg(dto);
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

  async changePlace(dto: messageUpdateWithImgDto) {
    const allContentImgForMessage: ContentImg[] = await this.findAllForMessage(
      dto.messageId,
    );
    let count: number = 0;
    if (dto.image_url.length === allContentImgForMessage.length)
      allContentImgForMessage.map((oneContentImg, i) => {
        if (oneContentImg.image_url === dto.image_url[i]) count++;
      });
    if (count !== allContentImgForMessage.length)
      for (let i = 0; i < allContentImgForMessage.length; i++) {
        await this.prisma.contentImg.update({
          where: {
            id: allContentImgForMessage[i].id,
          },
          data: {
            image_url: dto.image_url[i],
          },
        });
      }
  }

  async deleteForMessage(messageId: string) {
    const allContentImg: ContentImg[] = await this.findAllForMessage(messageId);
    if (allContentImg.length > 0) {
      try {
        await this.prisma.contentImg.deleteMany({
          where: {
            id: { in: allContentImg.map((oneContenImg) => oneContenImg.id) },
          },
        });
      } catch (error) {
        throw new BadRequestException(error?.message);
      }
      return allContentImg;
    }
  }
}
