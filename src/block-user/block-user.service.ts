import { Injectable } from '@nestjs/common';
import { CreateBlockUserDto } from './dto/create-block-user.dto';
import { UpdateBlockUserDto } from './dto/update-block-user.dto';
import { PrismaService } from 'src/prisma.service';
import { BlockUser } from '@prisma/client';

@Injectable()
export class BlockUserService {
  constructor(private prisma: PrismaService) {}

  async create(createBlockUserDto: CreateBlockUserDto) {
    const blockUserFind: BlockUser = await this.prisma.blockUser.findFirst({
      where: {
        user_Who_BlocketId: +createBlockUserDto.idUserWhoBlocked,
        user_Who_Was_BlocketId: +createBlockUserDto.idUserWhoWasBlocked,
      },
    });
    if (blockUserFind) {
      return blockUserFind;
    }
    const blockUser: BlockUser = await this.prisma.blockUser.create({
      data: {
        user_Who_BlocketId: +createBlockUserDto.idUserWhoBlocked,
        user_Who_Was_BlocketId: +createBlockUserDto.idUserWhoWasBlocked,
      },
    });
    return blockUser;
  }

  async remove(idUserWhoBlocked: number, idUserWhoWasBlocked: number) {
    const blockUser: BlockUser = await this.prisma.blockUser.findFirst({
      where: {
        user_Who_BlocketId: idUserWhoBlocked,
        user_Who_Was_BlocketId: idUserWhoWasBlocked,
      },
    });
    if (blockUser) {
      const deleteBlockUser: BlockUser = await this.prisma.blockUser.delete({
        where: {
          id: blockUser.id,
        },
      });
      return deleteBlockUser;
    }
    return blockUser;
  }

  async findAllBlocked(idUser: number) {
    const BlockUsers: BlockUser[] = await this.prisma.blockUser.findMany({
      where: {
        user_Who_BlocketId: idUser,
      },
    });

    const BlockUsersId: number[] = BlockUsers.map((one) => {
      return one.user_Who_Was_BlocketId;
    });
    return BlockUsersId;
  }

  async findAllBlocker(idUser: number) {
    const BlockerUsers: BlockUser[] = await this.prisma.blockUser.findMany({
      where: {
        user_Who_Was_BlocketId: idUser,
      },
    });

    const BlockerUsersId: number[] = BlockerUsers.map((one) => {
      return one.user_Who_BlocketId;
    });
    return BlockerUsersId;
  }
}
