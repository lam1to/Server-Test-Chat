import { Controller } from '@nestjs/common';
import { ContentImgService } from './content-img.service';

@Controller('content-img')
export class ContentImgController {
  constructor(private readonly contentImgService: ContentImgService) {}
}
