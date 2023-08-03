import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import { GatewayModule } from './gateway/gateway.module';
import { BlockUserModule } from './block-user/block-user.module';
import { LeftChatModule } from './left-chat/left-chat.module';
import { StorageModule } from './storage/storage.module';
import { ContentImgModule } from './content-img/content-img.module';
import configuration from './config/configuration';
import { GatewayService } from './gateway/gateway.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    GatewayModule,
    AuthModule,
    UserModule,
    ChatModule,
    MessageModule,
    BlockUserModule,
    LeftChatModule,
    StorageModule,
    ContentImgModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
