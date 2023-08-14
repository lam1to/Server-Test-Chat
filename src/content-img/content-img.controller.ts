import { Body, Controller, Post } from '@nestjs/common';
import { ContentImgService } from './content-img.service';
import { createContentImgDto } from './Dto/CreateContentImg.dto';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Content-img')
@Controller('content-img')
export class ContentImgController {
  constructor(private readonly contentImgService: ContentImgService) {}

  @ApiOperation({ summary: 'Create message' })
  @ApiOkResponse({
    description: 'Ok',
  })
  @ApiBody({ type: createContentImgDto })
  @Post('createContentImg')
  async create(@Body() dto: createContentImgDto) {
    return this.contentImgService.createOne();
  }
}
