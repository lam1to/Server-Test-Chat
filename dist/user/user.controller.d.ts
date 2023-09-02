import { UserService } from './user.service';
import { updateUserAvatarDto } from './Dto/updateUserAvatar.dto';
import { updateUserFiDto } from './Dto/updateFi.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(req: Request): Promise<{
        users: ({
            email: string;
            name: string;
            password: string;
            lastName: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            avatarPath: string;
        } & {})[];
    }>;
    updateUserAvatar(dto: updateUserAvatarDto): Promise<{
        email: string;
        name: string;
        password: string;
        lastName: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        avatarPath: string;
    } & {}>;
    updateUserFi(req: Request, dto: updateUserFiDto): Promise<{
        email: string;
        name: string;
        password: string;
        lastName: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        avatarPath: string;
    } & {}>;
}
