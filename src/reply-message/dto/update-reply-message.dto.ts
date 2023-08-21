import { PartialType } from '@nestjs/swagger';
import { CreateReplyMessageDto } from './create-reply-message.dto';

export class UpdateReplyMessageDto extends PartialType(CreateReplyMessageDto) {}
