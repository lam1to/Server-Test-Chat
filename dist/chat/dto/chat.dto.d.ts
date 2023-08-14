import { User } from '@prisma/client';
export declare class chatDto {
    id: number;
    type: string;
    createdAt: Date;
}
export declare class chatWithUserDto extends chatDto {
    users: User[];
}
export declare class deleteChat {
    deleteChat: chatDto;
    userInChatId: string[];
}
