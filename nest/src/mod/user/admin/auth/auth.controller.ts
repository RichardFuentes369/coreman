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
import { AdminGuard } from '@guard/admin/admin.guard';
import { ThrottlerGuard, Throttle } from '@nestjs/throttler';
import { AuthadminService } from './auth.service';
import { CreateAuthadminDto } from './dto/create-auth.dto';
import { TokenDto } from './dto/token.dto';
import { UpdateAuthadminDto } from './dto/update-auth.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('authadmin')
@UseGuards(ThrottlerGuard)
export class AuthadminController {
  constructor(private readonly authadminService: AuthadminService) {}

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
    @Body() createAuthDto: CreateAuthadminDto,
    @Res() res: Response
  ) {
    const result = await this.authadminService.signIn(lang, createAuthDto);
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
    const result = await this.authadminService.refreshToken(lang, { token: tok } as TokenDto);
    res.cookie('refresh_token', result.refresh_token, this.cookieOptions());
    return res.json({ access_token: result.access_token });
  }

  @UseGuards(AdminGuard)
  @Post('logout')
  async logout(
    @Req() req: ExpressRequest,
    @Res() res: Response
  ) {
    const auth = req.headers.authorization || '';
    const accessToken = auth.startsWith('Bearer ') ? auth.slice(7) : null;
    const cookieToken = (req as any).cookies?.refresh_token;
    if (accessToken) await this.authadminService.logout(accessToken);
    if (cookieToken) await this.authadminService.logout(cookieToken);
    res.clearCookie('refresh_token', { path: '/' });
    return res.json({ message: 'Sesión cerrada' });
  }

  @UseGuards(AdminGuard)
  @Post('reset-password')
  async resetPassword(
    @Query('lang') lang: string,
    @Body() body: { username: string },
    @Res() res: Response
  ) {
    const result = await this.authadminService.resetPassword(lang, body.username);
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename=${result.filename}`);
    res.send(result.buffer);
  }

  @UseGuards(AdminGuard)
  @Get('profile')
  getProfile(
    @Query('lang') lang: string,
    @Request() req
  ) {
    return this.authadminService.getProfile(lang, req.user.id);
  }
}