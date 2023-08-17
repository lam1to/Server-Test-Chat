import { PrismaService } from 'src/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { RegDto } from './dto/reg.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prisma;
    private jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
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
    getNewTokens(refreshToken: string): Promise<{
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
    private jwtToken;
    private returnUserFields;
    private validataUser;
}
