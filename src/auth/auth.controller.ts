import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RegDto } from './dto/reg.dto';
import { RefreshDto } from './dto/refresh.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('registration')
  async registration(@Body() dto: RegDto) {
    return this.authService.registration(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login/token')
  @UseGuards(AuthGuard)
  async getNewTokens(@Req() req: Request) {
    const [type, token] = req.headers['authorization'].split(' ') ?? [];
    const refreshT = type === 'Bearer' ? token : undefined;
    return this.authService.getNewTokens(refreshT);
  }

  @HttpCode(200)
  @Post('login/check')
  @UseGuards(AuthGuard)
  async check(@Req() req: Request) {
    const [type, token] = req.headers['authorization'].split(' ') ?? [];
    const refreshT = type === 'Bearer' ? token : undefined;
    return 'xui';
  }
}
