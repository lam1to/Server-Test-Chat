import { CreateChatDto } from './dto/createChat.dto';
import { PrismaService } from 'src/prisma.service';
import { FindChatDto } from './dto/findDto.dto';
export declare class ChatService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createChatDto: CreateChatDto): Promise<{
        id: number;
        createdAt: Date;
        type: string;
    } & {}>;
    findAll(dto: FindChatDto): Promise<({
        id: number;
        createdAt: Date;
        type: string;
    } & {})[]>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        type: string;
    } & {}>;
}
