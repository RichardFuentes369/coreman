import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Request,
  Req,
  Res,
  UseGuards
} from '@nestjs/common';
import { Response, Request as ExpressRequest } from 'express';
import { FinalGuard } from '@guard/final/final.guard';
import { ThrottlerGuard, Throttle } from '@nestjs/throttler';
import { AuthuserService } from './auth.service';
import { CreateAuthuserDto } from './dto/create-auth.dto';
import { TokenDto } from './dto/token.dto';
import { UpdateAuthuserDto } from './dto/update-auth.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('authuser')
@UseGuards(ThrottlerGuard)
export class AuthuserController {
  constructor(private readonly authauserService: AuthuserService) {}

  private cookieOptions() {
    const secure = process.env.NODE_ENV === 'production';
    return {
      httpOnly: true,
      secure,
      sameSite: (secure ? 'none' : 'lax') as 'none' | 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('login')
  async create(
    @Query('lang') lang: string,
    @Body() createAuthDto: CreateAuthuserDto,
    @Res() res: Response
  ) {
    const result = await this.authauserService.signIn(lang, createAuthDto);
    res.cookie('refresh_token', result.refresh_token, this.cookieOptions());
    return res.json({ access_token: result.access_token });
  }

  @Post('refresh')
  async refreshToken(
    @Query('lang') lang: string,
    @Body() token: TokenDto,
    @Req() req: ExpressRequest,
    @Res() res: Response
  ) {
    const tok = (req as any).cookies?.refresh_token || token?.token;
    const result = await this.authauserService.refreshToken(lang, { token: tok } as TokenDto);
    res.cookie('refresh_token', result.refresh_token, this.cookieOptions());
    return res.json({ access_token: result.access_token });
  }

  @UseGuards(FinalGuard)
  @Post('logout')
  async logout(
    @Req() req: ExpressRequest,
    @Res() res: Response
  ) {
    const auth = req.headers.authorization || '';
    const accessToken = auth.startsWith('Bearer ') ? auth.slice(7) : null;
    const cookieToken = (req as any).cookies?.refresh_token;
    if (accessToken) await this.authauserService.logout(accessToken);
    if (cookieToken) await this.authauserService.logout(cookieToken);
    res.clearCookie('refresh_token', { path: '/' });
    return res.json({ message: 'Sesión cerrada' });
  }

  @Post('reset-password')
  async resetPassword(
    @Query('lang') lang: string,
    @Body() body: { username: string },
    @Res() res: Response
  ) {
    const result = await this.authauserService.resetPassword(lang, body.username);
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename=${result.filename}`);
    res.send(result.buffer);
  }

  @UseGuards(FinalGuard)
  @Get('profile')
  getProfile(
    @Query('lang') lang: string,
    @Request() req
  ) {
    return this.authauserService.getProfile(lang, req.user.id);
  }
}