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
import {
  CountUnreadMessage,
  MessageDto,
  returnMessageDto,
} from './dto/messageDto.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ContentImgService } from 'src/content-img/content-img.service';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MessageUpdateDto } from './dto/messageUpdateDto.dto';
import { MessageWithImgDto } from './dto/messageWithImg.dto';

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

  // @ApiOperation({ summary: 'Get all count unread message for all chat' })
  // @ApiOkResponse({
  //   description: 'count unread message for chat',
  //   type: CountUnreadMessage,
  // })
  // @ApiBody({ type: Req })
  // @Get('getAllCountUnreadMessage')
  // @UseGuards(AuthGuard)
  // async getAllUnreadMessage(@Req() req: Request) {
  //   return this.messageService.getAllUnreadMessage(req['user'].id);
  // }

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

  @ApiOperation({ summary: 'Get one part message for chat' })
  @ApiOkResponse({
    description: 'messages',
    type: [returnMessageDto],
  })
  @Get('getMessage/limit=:id/chat=:id2/part=:id3')
  @UseGuards(AuthGuard)
  async getOnePartMessage(
    @Param('id') limitCount: string,
    @Param('id2') chatId: string,
    @Param('id3') partId: string,
    @Req() req: Request,
  ) {
    console.log(
      'limit count message = ',
      limitCount,
      'чат с таким id = ',
      chatId,
      ' part такое - ',
      partId,
    );
    return this.messageService.getOnePartMessage(
      limitCount,
      chatId,
      partId,
      req['user'].id,
    );
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

  @ApiOperation({ summary: 'Get last messages' })
  @ApiOkResponse({
    description: 'last messages for user',
    type: MessageDto,
  })
  @ApiBody({ type: Req })
  @Get('lastMessage')
  @UseGuards(AuthGuard)
  async getLastMessage(@Req() req: Request) {
    return this.messageService.getLastMessage(req['user'].id);
  }
}
