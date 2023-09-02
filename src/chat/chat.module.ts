import { Module, forwardRef } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from 'src/config/jwt.config';
import { GatewayService } from 'src/gateway/gateway.service';
import { MessageService } from 'src/message/message.service';
import { UserService } from 'src/user/user.service';
import { ContentImgService } from 'src/content-img/content-img.service';
import { MessageStatusService } from 'src/message_status/message_status.service';

@Module({
  controllers: [ChatController],
  providers: [
    ChatService,
    JwtStrategy,
    PrismaService,
    MessageService,
    UserService,
    ContentImgService,
    MessageStatusService,
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
export class ChatModule {}
