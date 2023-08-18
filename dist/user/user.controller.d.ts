import { UserService } from './user.service';
import { updateUserAvatarDto } from './Dto/updateUserAvatar.dto';
import { updateUserFiDto } from './Dto/updateFi.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(req: Request): Promise<{
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
    updateUserFi(req: Request, dto: updateUserFiDto): Promise<{
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
