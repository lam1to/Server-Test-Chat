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
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { blockUserDto } from './dto/blockUser.dto';

@ApiTags('Block user')
@Controller('blockUser')
export class BlockUserController {
  constructor(private readonly blockUserService: BlockUserService) {}

  @ApiOperation({ summary: 'create block user' })
  @ApiOkResponse({
    description: 'id who blocked, id who was blocked',
    type: blockUserDto,
  })
  @ApiBody({ type: CreateBlockUserDto })
  @Post('createBlockUser')
  @UseGuards(AuthGuard)
  create(@Body() createBlockUserDto: CreateBlockUserDto) {
    console.log('зашли в create ', createBlockUserDto);
    return this.blockUserService.create(createBlockUserDto);
  }

  @ApiOperation({ summary: 'remove block user' })
  @ApiOkResponse({
    description: 'id who blocked, id who was blocked',
    type: blockUserDto,
  })
  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Req() req: Request, @Param('id') id: string) {
    return this.blockUserService.remove(+req['user'].id, +id);
  }

  @ApiOperation({ summary: 'Find all blocked for user' })
  @ApiOkResponse({
    description: 'id who blocked',
    type: [Number],
  })
  @ApiBody({ type: Req })
  @Get('findAllBlockedForUser')
  @UseGuards(AuthGuard)
  findAllBlocked(@Req() req: Request) {
    return this.blockUserService.findAllBlocked(+req['user'].id);
  }

  @ApiOperation({ summary: 'Find all blocker for user' })
  @ApiOkResponse({
    description: 'id who blocker',
    type: [Number],
  })
  @ApiBody({ type: Req })
  @Get('findAllBlockerForUser')
  @UseGuards(AuthGuard)
  findAllBlocker(@Req() req: Request) {
    return this.blockUserService.findAllBlocker(+req['user'].id);
  }
}
