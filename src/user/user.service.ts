import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ParamDto } from './Dto/param.dto';
import { User } from '@prisma/client';
import { updateUserAvatarDto } from './Dto/updateUserAvatar.dto';
import { updateUserFiDto } from './Dto/updateFi.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserId(idUser: ParamDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: +idUser.id,
      },
    });
    return user;
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
    const user: User = await this.getUserId({ id: dto.id });
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
      const userReturn: User = await this.getUserId({ id: dto.id });
      return userReturn;
    }
  }
  async updateName(id: string, name: string) {
    await this.prisma.user.update({
      where: {
        id: +id,
      },
      data: {
        name: name,
      },
    });
  }
  async updateLastName(id: string, lastName: string) {
    await this.prisma.user.update({
      where: {
        id: +id,
      },
      data: {
        lastName: lastName,
      },
    });
  }
  async updateFi(id, dto: updateUserFiDto) {
    await this.prisma.user.update({
      where: {
        id: +id,
      },
      data: {
        name: dto.name,
        lastName: dto.lastName,
      },
    });
  }
  async updateUserFi(dto: updateUserFiDto, id: string) {
    const user: User = await this.getUserId({ id: id });
    if (user) {
      if (dto.name !== user.name) {
        await this.updateName(id, dto.name);
      }
      if (dto.lastName !== user.lastName) {
        await this.updateLastName(id, dto.lastName);
      }
      if (dto.lastName !== user.lastName && dto.name !== user.name) {
        await this.updateFi(id, dto);
      }
      const userReturn: User = await this.getUserId({ id: id });
      return userReturn;
    }
  }
}
