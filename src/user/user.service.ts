import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ParamDto } from './Dto/param.dto';
import { User } from '@prisma/client';
import { updateUserAvatarDto } from './Dto/updateUserAvatar.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserId(idUser: ParamDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: +idUser.id,
      },
    });
    return {
      name: user.name,
      lastName: user.lastName,
      avatarPath: user.avatarPath,
    };
  }

  async getAllUsers(id: string) {
    const users: User[] = await this.prisma.user.findMany({
      where: {
        id: { not: +id },
      },
    });
    return { users: users };
  }

  async updateUserAvatar(dto: updateUserAvatarDto) {
    const user: User = await this.prisma.user.findFirst({
      where: {
        id: +dto.id,
      },
    });
    if (user) {
      console.log('avatar path = ', dto.avatar_path);
      await this.prisma.user.update({
        where: {
          id: +dto.id,
        },
        data: {
          avatarPath: dto.avatar_path,
        },
      });
      const userReturn: User = await this.prisma.user.findFirst({
        where: {
          id: +dto.id,
        },
      });
      return userReturn;
    }
  }
}
