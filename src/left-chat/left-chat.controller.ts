import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { LeftChatService } from './left-chat.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Left chat')
@Controller('leftChat')
export class LeftChatController {
  constructor(private readonly leftChatService: LeftChatService) {}

  @ApiOperation({ summary: 'Find all left chat' })
  @ApiOkResponse({
    description: 'id chat',
    type: [Number],
  })
  @ApiBody({ type: Req })
  @Get('allLeftChat')
  @UseGuards(AuthGuard)
  findAll(@Req() req: Request) {
    return this.leftChatService.findAll(req['user'].id);
  }
}
