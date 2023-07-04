import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageCreateDto } from './dto/messageCreateDto.dto';
import { MessageUpdateDto } from './dto/messageUpdateDto.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('create')
  async createMessage(@Body() dto: MessageCreateDto) {
    return this.messageService.createMessage(dto);
  }

  @Get('getAllForChat/:id')
  async getAllForChat(@Param('id') id: string) {
    return this.messageService.getAllForChat(id);
  }
  @Patch('update')
  async updateMessage(@Body() dto: MessageUpdateDto) {
    return this.messageService.updateMessage(dto);
  }
}
