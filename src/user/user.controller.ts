import { Body, Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ParamDto } from './param.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Get(':id')
  // //@UseGuards(AuthGuard)
  // async getUserId(@Param() id: ParamDto) {
  //   return this.userService.getUserId(id);
  // }
  @Get('allUsers')
  @UseGuards(AuthGuard)
  async getUsers(@Req() req: Request) {
    return this.userService.getAllUsers(req['user'].id);
  }
}
