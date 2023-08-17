import { PrismaService } from 'src/prisma.service';
import { ParamDto } from './Dto/param.dto';
import { updateUserAvatarDto } from './Dto/updateUserAvatar.dto';
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
            id: number;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            password: string;
            name: string;
            lastName: string;
            avatarPath: string;
        } & {})[];
    }>;
    updateUserAvatar(dto: updateUserAvatarDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        name: string;
        lastName: string;
        avatarPath: string;
    } & {}>;
}
