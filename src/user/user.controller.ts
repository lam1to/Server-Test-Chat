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
import { updateUserFiDto } from './Dto/updateFi.dto';

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
  @ApiBody({ type: updateUserAvatarDto })
  @Post('updateAvatar')
  @UseGuards(AuthGuard)
  async updateUserAvatar(@Body() dto: updateUserAvatarDto) {
    return this.userService.updateUserAvatar(dto);
  }

  @ApiOperation({ summary: 'Update name/lastName' })
  @ApiOkResponse({
    description: 'Ok',
  })
  @ApiBody({ type: updateUserFiDto })
  @Post('updateFi')
  @UseGuards(AuthGuard)
  async updateUserFi(@Req() req: Request, @Body() dto: updateUserFiDto) {
    return this.userService.updateUserFi(dto, req['user'].id);
  }
}
