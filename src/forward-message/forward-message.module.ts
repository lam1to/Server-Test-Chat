import { Module } from '@nestjs/common';
import { ForwardMessageService } from './forward-message.service';
import { ForwardMessageController } from './forward-message.controller';

@Module({
  controllers: [ForwardMessageController],
  providers: [ForwardMessageService]
})
export class ForwardMessageModule {}
