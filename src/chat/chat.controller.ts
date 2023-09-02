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
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { chatWithUserDto, deleteChat } from './dto/chat.dto';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @ApiOperation({ summary: 'Create chat' })
  @ApiOkResponse({
    description: 'chat',
    type: chatWithUserDto,
  })
  @ApiBody({ type: CreateChatDto })
  @Post('createChat')
  @UseGuards(AuthGuard)
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @ApiOperation({ summary: 'Find all chat for user' })
  @ApiOkResponse({
    description: 'chats',
    type: [chatWithUserDto],
  })
  @ApiBody({ type: Req })
  @Get('allChat')
  @UseGuards(AuthGuard)
  findAll(@Req() req: Request) {
    return this.chatService.findAll(req['user'].id);
  }

  @ApiOperation({ summary: 'Delete chat' })
  @ApiOkResponse({
    description: 'chat and id user who was in chat',
    type: [deleteChat],
  })
  @ApiParam({
    name: 'id',
  })
  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.chatService.remove(+id);
  }
}
