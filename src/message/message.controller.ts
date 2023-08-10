import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageCreateDto } from './dto/messageCreateDto.dto';
import { MessageUpdateDto } from './dto/messageUpdateDto.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ContentImgService } from 'src/content-img/content-img.service';

@Controller('message')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private contentImg: ContentImgService,
  ) {}

  @Post('create')
  async createMessage(@Body() dto: MessageCreateDto) {
    return this.messageService.createMessage(dto);
  }

  @Get('getAllForChat/:id')
  @UseGuards(AuthGuard)
  async getAllForChat(@Param('id') id: string, @Req() req: Request) {
    const idUser = req['user'].id;
    return this.messageService.getAllForChat(id, idUser);
  }
  @Patch('update')
  async updateMessage(@Body() dto: MessageUpdateDto) {
    return this.messageService.updateMessage(dto);
  }
}
