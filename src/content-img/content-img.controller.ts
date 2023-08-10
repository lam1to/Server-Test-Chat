import { Body, Controller, Post } from '@nestjs/common';
import { ContentImgService } from './content-img.service';
import { createContentImgDto } from './Dto/CreateContentImg.dto';

@Controller('content-img')
export class ContentImgController {
  constructor(private readonly contentImgService: ContentImgService) {}

  @Post('createContentImg')
  async create(@Body() dto: createContentImgDto) {
    return this.contentImgService.createOne(dto);
  }
}
