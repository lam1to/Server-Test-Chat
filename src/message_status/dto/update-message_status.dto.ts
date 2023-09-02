import { PartialType } from '@nestjs/swagger';
import { CreateMessageStatusDto } from './create-message_status.dto';

export class UpdateMessageStatusDto extends PartialType(CreateMessageStatusDto) {}
