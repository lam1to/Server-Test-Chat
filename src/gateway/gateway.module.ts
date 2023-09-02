import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { GatewayGateway } from './gateway.gateway';
import { PrismaService } from 'src/prisma.service';
import { MessageService } from 'src/message/message.service';
import { ChatService } from 'src/chat/chat.service';
import { BlockUserService } from 'src/block-user/block-user.service';
import { LeftChatService } from 'src/left-chat/left-chat.service';
import { MessageModule } from 'src/message/message.module';
import { ChatModule } from 'src/chat/chat.module';
import { ContentImgService } from 'src/content-img/content-img.service';
import { StorageService } from 'src/storage/storage.service';
import { UserService } from 'src/user/user.service';
import { ReplyMessageService } from 'src/reply-message/reply-message.service';
import { ForwardMessageService } from 'src/forward-message/forward-message.service';
import { MessageStatusService } from 'src/message_status/message_status.service';

@Module({
  providers: [
    GatewayGateway,
    GatewayService,
    MessageService,
    ChatService,
    PrismaService,
    BlockUserService,
    LeftChatService,
    ContentImgService,
    StorageService,
    UserService,
    ReplyMessageService,
    ForwardMessageService,
    MessageStatusService,
  ],
  exports: [GatewayGateway],
})
export class GatewayModule {}
