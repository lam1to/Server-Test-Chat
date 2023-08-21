import { Injectable } from '@nestjs/common';
import { CreateForwardMessageDto } from './dto/create-forward-message.dto';
import { UpdateForwardMessageDto } from './dto/update-forward-message.dto';

@Injectable()
export class ForwardMessageService {
  create(createForwardMessageDto: CreateForwardMessageDto) {
    return 'This action adds a new forwardMessage';
  }

  findAll() {
    return `This action returns all forwardMessage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} forwardMessage`;
  }

  update(id: number, updateForwardMessageDto: UpdateForwardMessageDto) {
    return `This action updates a #${id} forwardMessage`;
  }

  remove(id: number) {
    return `This action removes a #${id} forwardMessage`;
  }
}
