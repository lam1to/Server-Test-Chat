import { CreateForwardMessageDto } from './dto/create-forward-message.dto';
import { UpdateForwardMessageDto } from './dto/update-forward-message.dto';
export declare class ForwardMessageService {
    create(createForwardMessageDto: CreateForwardMessageDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateForwardMessageDto: UpdateForwardMessageDto): string;
    remove(id: number): string;
}
