import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/createChat.dto';
import { FindChatDto } from './dto/findDto.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('createChat')
  @UseGuards(AuthGuard)
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @Get('allChat')
  @UseGuards(AuthGuard)
  findAll(@Req() req: Request) {
    return this.chatService.findAll(req['user'].id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.chatService.remove(+id);
  }
}
