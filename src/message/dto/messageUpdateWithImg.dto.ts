import { MessageUpdateDto } from './messageUpdateDto.dto';

export class messageUpdateWithImgDto extends MessageUpdateDto {
  image_url: string[];
}
