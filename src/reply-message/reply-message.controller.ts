import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReplyMessageService } from './reply-message.service';
import { CreateReplyMessageDto } from './dto/create-reply-message.dto';
import { UpdateReplyMessageDto } from './dto/update-reply-message.dto';

@Controller('reply-message')
export class ReplyMessageController {
  constructor(private readonly replyMessageService: ReplyMessageService) {}
}
