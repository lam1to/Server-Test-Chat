import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ForwardMessageService } from './forward-message.service';
import { CreateForwardMessageDto } from './dto/create-forward-message.dto';
import { UpdateForwardMessageDto } from './dto/update-forward-message.dto';

@Controller('forward-message')
export class ForwardMessageController {
  constructor(private readonly forwardMessageService: ForwardMessageService) {}
}
