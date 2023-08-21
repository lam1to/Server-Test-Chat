import { PrismaService } from 'src/prisma.service';
import { ParamDto } from './Dto/param.dto';
import { updateUserAvatarDto } from './Dto/updateUserAvatar.dto';
import { updateUserFiDto } from './Dto/updateFi.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    getUserId(idUser: ParamDto): Promise<{
        email: string;
        password: string;
        name: string;
        lastName: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        avatarPath: string;
    } & {}>;
    getAllUsers(id: string): Promise<{
        users: ({
            email: string;
            password: string;
            name: string;
            lastName: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            avatarPath: string;
        } & {})[];
    }>;
    updateUserAvatar(dto: updateUserAvatarDto): Promise<{
        email: string;
        password: string;
        name: string;
        lastName: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        avatarPath: string;
    } & {}>;
    updateName(id: string, name: string): Promise<void>;
    updateLastName(id: string, lastName: string): Promise<void>;
    updateFi(id: any, dto: updateUserFiDto): Promise<void>;
    updateUserFi(dto: updateUserFiDto, id: string): Promise<{
        email: string;
        password: string;
        name: string;
        lastName: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        avatarPath: string;
    } & {}>;
}
