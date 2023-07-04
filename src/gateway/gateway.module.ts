import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { GatewayGateway } from './gateway.gateway';
import { PrismaService } from 'src/prisma.service';
import { MessageService } from 'src/message/message.service';
import { ChatService } from 'src/chat/chat.service';

@Module({
  providers: [
    GatewayGateway,
    GatewayService,
    PrismaService,
    MessageService,
    ChatService,
  ],
})
export class GatewayModule {}
