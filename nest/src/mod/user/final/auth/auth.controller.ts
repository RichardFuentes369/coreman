import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Request,
  Res,
  UseGuards
} from '@nestjs/common';
import { Response } from 'express';
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

  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('login')
  create(
    @Query('lang') lang:string,
    @Body() createAuthDto: CreateAuthuserDto
  ) {
    return this.authauserService.signIn(
      lang,
      createAuthDto
    );
  }

  @Post('refresh')
  refreshToken(
    @Query('lang') lang:string,
    @Body() token: TokenDto
  ) {
    return this.authauserService.refreshToken(
      lang,
      token
    );
  }

  @UseGuards(FinalGuard)
  @Post('logout')
  logout(
    @Request() req
  ) {
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : (req.body && req.body.token);
    return this.authauserService.logout(token);
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
    @Query('lang') lang:string,
    @Request() req
  ) {
    return this.authauserService.getProfile(lang, req.user.id);
  }
}
