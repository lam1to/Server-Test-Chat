import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private prisma;
    constructor(configService: ConfigService, prisma: PrismaService);
    validate({ id }: Pick<User, 'id'>): Promise<{
        email: string;
        password: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        lastName: string;
        avatarPath: string;
    } & {}>;
}
export {};
