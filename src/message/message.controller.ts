import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageCreateDto } from './dto/messageCreateDto.dto';
import { MessageUpdateDto } from './dto/messageUpdateDto.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

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
