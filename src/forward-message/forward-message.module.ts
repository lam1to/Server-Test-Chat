import { Module } from '@nestjs/common';
import { ForwardMessageService } from './forward-message.service';
import { ForwardMessageController } from './forward-message.controller';
import { PrismaService } from 'src/prisma.service';
import { MessageService } from 'src/message/message.service';
import { ChatService } from 'src/chat/chat.service';
import { UserService } from 'src/user/user.service';
import { MessageStatusService } from 'src/message_status/message_status.service';

@Module({
  controllers: [ForwardMessageController],
  providers: [
    ForwardMessageService,
    PrismaService,
    MessageService,
    ChatService,
    UserService,
    MessageStatusService,
  ],
})
export class ForwardMessageModule {}
