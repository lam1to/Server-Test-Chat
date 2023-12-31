import { Module } from '@nestjs/common';
import { ReplyMessageService } from './reply-message.service';
import { ReplyMessageController } from './reply-message.controller';
import { PrismaService } from 'src/prisma.service';
import { MessageService } from 'src/message/message.service';
import { ChatService } from 'src/chat/chat.service';
import { UserService } from 'src/user/user.service';
import { MessageStatusService } from 'src/message_status/message_status.service';

@Module({
  controllers: [ReplyMessageController],
  providers: [
    ReplyMessageService,
    PrismaService,
    MessageService,
    ChatService,
    UserService,
    MessageStatusService,
  ],
})
export class ReplyMessageModule {}
