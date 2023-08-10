import { ContentImgService } from './content-img.service';
import { createContentImgDto } from './Dto/CreateContentImg.dto';
export declare class ContentImgController {
    private readonly contentImgService;
    constructor(contentImgService: ContentImgService);
    create(dto: createContentImgDto): Promise<void>;
}
