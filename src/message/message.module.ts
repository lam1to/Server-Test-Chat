import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { PrismaService } from 'src/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from 'src/config/jwt.config';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { StorageService } from 'src/storage/storage.service';
import { ContentImgService } from 'src/content-img/content-img.service';
import { GatewayService } from 'src/gateway/gateway.service';
import { GatewayGateway } from 'src/gateway/gateway.gateway';
import { GatewayModule } from 'src/gateway/gateway.module';
import { ChatService } from 'src/chat/chat.service';
import { BlockUserService } from 'src/block-user/block-user.service';
import { LeftChatService } from 'src/left-chat/left-chat.service';
import { StorageModule } from 'src/storage/storage.module';
import { UserService } from 'src/user/user.service';
import { ReplyMessage } from 'src/reply-message/entities/reply-message.entity';
import { ReplyMessageService } from 'src/reply-message/reply-message.service';

@Module({
  controllers: [MessageController],
  providers: [
    MessageService,
    JwtStrategy,
    PrismaService,
    ContentImgService,
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
export class MessageModule {}
