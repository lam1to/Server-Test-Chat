import { BlockUserService } from './block-user.service';
import { CreateBlockUserDto } from './dto/create-block-user.dto';
export declare class BlockUserController {
    private readonly blockUserService;
    constructor(blockUserService: BlockUserService);
    create(createBlockUserDto: CreateBlockUserDto): Promise<{
        id: number;
        user_Who_BlocketId: number;
        user_Who_Was_BlocketId: number;
    } & {}>;
    remove(req: Request, id: string): Promise<{
        id: number;
        user_Who_BlocketId: number;
        user_Who_Was_BlocketId: number;
    } & {}>;
    findAllBlocked(req: Request): Promise<number[]>;
    findAllBlocker(req: Request): Promise<number[]>;
    findOne(id: string): string;
}
