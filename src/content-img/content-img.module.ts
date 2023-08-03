import { Module } from '@nestjs/common';
import { ContentImgService } from './content-img.service';
import { ContentImgController } from './content-img.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ContentImgController],
  providers: [ContentImgService, PrismaService],
})
export class ContentImgModule {}
