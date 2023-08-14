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
import { MessageDto, returnMessageDto } from './dto/messageDto.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ContentImgService } from 'src/content-img/content-img.service';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MessageUpdateDto } from './dto/messageUpdateDto.dto';

@ApiTags('Message')
@Controller('message')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private contentImg: ContentImgService,
  ) {}

  @ApiOperation({ summary: 'Create message' })
  @ApiOkResponse({
    description: 'message',
    type: returnMessageDto,
  })
  @ApiBody({ type: MessageDto })
  @Post('create')
  async createMessage(@Body() dto: MessageDto) {
    return this.messageService.createMessage(dto);
  }

  @ApiOperation({ summary: 'Get All messages for chat' })
  @ApiOkResponse({
    description: 'messages',
    type: [returnMessageDto],
  })
  @Get('getAllForChat/:id')
  @UseGuards(AuthGuard)
  async getAllForChat(@Param('id') id: string, @Req() req: Request) {
    const idUser = req['user'].id;
    return this.messageService.getAllForChat(id, idUser);
  }

  @ApiOperation({ summary: 'Update message' })
  @ApiOkResponse({
    description: 'update message',
    type: returnMessageDto,
  })
  @ApiBody({ type: MessageUpdateDto })
  @Patch('update')
  async updateMessage(@Body() dto: MessageUpdateDto) {
    return this.messageService.updateMessage(dto);
  }
}
