import { PrismaService } from 'src/prisma.service';
import { ParamDto } from './param.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    getUserId(idUser: ParamDto): Promise<{
        name: string;
        lastName: string;
        avatarPath: string;
    }>;
    getAllUsers(id: string): Promise<{
        users: ({
            email: string;
            password: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            lastName: string;
            avatarPath: string;
        } & {})[];
    }>;
}
