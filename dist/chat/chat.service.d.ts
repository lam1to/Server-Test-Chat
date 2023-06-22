import { CreateChatDto } from './dto/createChat.dto';
import { PrismaService } from 'src/prisma.service';
import { FindChatDto } from './dto/findDto.dto';
export declare class ChatService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createChatDto: CreateChatDto): Promise<{
        id: number;
        type: string;
        createdAt: Date;
    } & {}>;
    findAll(dto: FindChatDto): Promise<({
        id: number;
        type: string;
        createdAt: Date;
    } & {})[]>;
    findOne(id: number): string;
    remove(id: number): string;
}
