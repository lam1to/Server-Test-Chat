import { CreateBlockUserDto } from './dto/create-block-user.dto';
import { PrismaService } from 'src/prisma.service';
export declare class BlockUserService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createBlockUserDto: CreateBlockUserDto): Promise<{
        id: number;
        user_Who_BlocketId: number;
        user_Who_Was_BlocketId: number;
    } & {}>;
    remove(idUserWhoBlocked: number, idUserWhoWasBlocked: number): Promise<{
        id: number;
        user_Who_BlocketId: number;
        user_Who_Was_BlocketId: number;
    } & {}>;
    findAllBlocked(idUser: number): Promise<number[]>;
    findAllBlocker(idUser: number): Promise<number[]>;
}
