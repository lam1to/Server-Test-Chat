import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BlockUserService } from './block-user.service';
import { CreateBlockUserDto } from './dto/create-block-user.dto';
import { UpdateBlockUserDto } from './dto/update-block-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('blockUser')
export class BlockUserController {
  constructor(private readonly blockUserService: BlockUserService) {}

  @Post('createBlockUser')
  @UseGuards(AuthGuard)
  create(@Body() createBlockUserDto: CreateBlockUserDto) {
    console.log('зашли в create ', createBlockUserDto);
    return this.blockUserService.create(createBlockUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Req() req: Request, @Param('id') id: string) {
    return this.blockUserService.remove(+req['user'].id, +id);
  }

  @Get('findAllBlockedForUser')
  @UseGuards(AuthGuard)
  findAllBlocked(@Req() req: Request) {
    return this.blockUserService.findAllBlocked(+req['user'].id);
  }

  @Get('findAllBlockerForUser')
  @UseGuards(AuthGuard)
  findAllBlocker(@Req() req: Request) {
    return this.blockUserService.findAllBlocker(+req['user'].id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blockUserService.findOne(+id);
  }
}
