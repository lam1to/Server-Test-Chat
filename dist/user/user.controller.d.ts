import { UserService } from './user.service';
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
}
