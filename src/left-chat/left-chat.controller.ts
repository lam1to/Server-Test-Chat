import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { LeftChatService } from './left-chat.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('leftChat')
export class LeftChatController {
  constructor(private readonly leftChatService: LeftChatService) {}

  @Get('allLeftChat')
  @UseGuards(AuthGuard)
  findAll(@Req() req: Request) {
    return this.leftChatService.findAll(req['user'].id);
  }
}
