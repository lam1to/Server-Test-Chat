import { Module } from '@nestjs/common';
import { LeftChatService } from './left-chat.service';
import { LeftChatController } from './left-chat.controller';
import { PrismaService } from 'src/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from 'src/config/jwt.config';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  controllers: [LeftChatController],
  providers: [LeftChatService, JwtStrategy, PrismaService],
  imports: [
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
})
export class LeftChatModule {}
