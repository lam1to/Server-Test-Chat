import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ParamDto } from './Dto/param.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { userReturnDto } from './Dto/userReturn.dto';
import { updateUserAvatarDto } from './Dto/updateUserAvatar.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get All Users' })
  @ApiOkResponse({
    description: 'users',
    type: [userReturnDto],
  })
  @ApiBody({ type: Req })
  @Get('allUsers')
  @UseGuards(AuthGuard)
  async getUsers(@Req() req: Request) {
    return this.userService.getAllUsers(req['user'].id);
  }

  @ApiOperation({ summary: 'Update avatar path' })
  @ApiOkResponse({
    description: 'Ok',
  })
  @ApiBody({ type: Req })
  @Post('updateAvatar')
  @UseGuards(AuthGuard)
  async updateUserAvatar(@Body() dto: updateUserAvatarDto) {
    return this.userService.updateUserAvatar(dto);
  }
}
