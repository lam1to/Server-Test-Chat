import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RegDto } from './dto/reg.dto';
import { RefreshDto } from './dto/refresh.dto';
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
            lastname: string;
        };
    }>;
    login(dto: AuthDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: number;
            email: string;
            name: string;
            lastname: string;
        };
    }>;
    getNewTokens(dto: RefreshDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: number;
            email: string;
            name: string;
            lastname: string;
        };
    }>;
}
