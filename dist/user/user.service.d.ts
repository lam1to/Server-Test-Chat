import { PrismaService } from 'src/prisma.service';
import { ParamDto } from './Dto/param.dto';
import { updateUserAvatarDto } from './Dto/updateUserAvatar.dto';
import { updateUserFiDto } from './Dto/updateFi.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    getUserId(idUser: ParamDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        name: string;
        lastName: string;
        avatarPath: string;
    } & {}>;
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
    updateName(id: string, name: string): Promise<void>;
    updateLastName(id: string, lastName: string): Promise<void>;
    updateFi(id: any, dto: updateUserFiDto): Promise<void>;
    updateUserFi(dto: updateUserFiDto, id: string): Promise<{
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
