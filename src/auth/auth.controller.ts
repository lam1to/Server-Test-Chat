import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RegDto } from './dto/reg.dto';
import { RefreshDto } from './dto/refresh.dto';
import { AuthGuard } from './auth.guard';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { returnDataDto } from './dto/returnData.dto';
import { ValidationExceptionDto } from 'src/validation/validation-exception.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Registration' })
  @ApiOkResponse({
    description: 'user, tokens',
    type: returnDataDto,
  })
  @ApiBadRequestResponse({
    description: 'Validation failed',
    type: ValidationExceptionDto,
  })
  @ApiUnauthorizedResponse({
    description: 'User already exists',
    type: UnauthorizedException,
  })
  @ApiBody({ type: RegDto })
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('registration')
  async registration(@Body() dto: RegDto) {
    return this.authService.registration(dto);
  }

  @ApiOperation({ summary: 'Login' })
  @ApiOkResponse({
    description: 'user, tokens',
    type: returnDataDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
    type: UnauthorizedException,
  })
  @ApiBody({ type: AuthDto })
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'getNewTokens' })
  @ApiOkResponse({
    description: 'user, tokens',
    type: returnDataDto,
  })
  @ApiBody({ type: Req })
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login/token')
  @UseGuards(AuthGuard)
  async getNewTokens(@Req() req: Request) {
    const [type, token] = req.headers['authorization'].split(' ') ?? [];
    const refreshT = type === 'Bearer' ? token : undefined;
    return this.authService.getNewTokens(refreshT);
  }
}
