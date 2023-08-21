import { PartialType } from '@nestjs/swagger';
import { CreateForwardMessageDto } from './create-forward-message.dto';

export class UpdateForwardMessageDto extends PartialType(CreateForwardMessageDto) {}
