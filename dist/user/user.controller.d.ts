import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(req: Request): Promise<{
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
