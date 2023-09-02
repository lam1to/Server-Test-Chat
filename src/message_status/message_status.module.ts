import { Module } from '@nestjs/common';
import { MessageStatusService } from './message_status.service';
import { MessageStatusController } from './message_status.controller';
import { ChatService } from 'src/chat/chat.service';
import { PrismaService } from 'src/prisma.service';
import { MessageService } from 'src/message/message.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from 'src/config/jwt.config';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [MessageStatusController],
  providers: [
    MessageStatusService,
    PrismaService,
    MessageService,
    ChatService,
    UserService,
  ],
  imports: [
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
})
export class MessageStatusModule {}
