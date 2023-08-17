import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RegDto } from './dto/reg.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registration(dto: RegDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: number;
            email: string;
            name: string;
            lastName: string;
            avatar_path: string;
        };
    }>;
    login(dto: AuthDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: number;
            email: string;
            name: string;
            lastName: string;
            avatar_path: string;
        };
    }>;
    getNewTokens(req: Request): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: number;
            email: string;
            name: string;
            lastName: string;
            avatar_path: string;
        };
    }>;
}
