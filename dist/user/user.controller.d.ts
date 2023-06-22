import { UserService } from './user.service';
import { ParamDto } from './param.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUserId(id: ParamDto): Promise<{
        name: string;
        lastName: string;
        avatarPath: string;
    }>;
}
