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

  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('login')
  create(
    @Query('lang') lang: string, 
    @Body() createAuthDto: CreateAuthadminDto
  ) {
    return this.authadminService.signIn(
      lang,
      createAuthDto
    );
  }
  
  @Post('refresh')
  refreshToken(
    @Query('lang') lang: string,
    @Body() token: TokenDto
  ) {
    return this.authadminService.refreshToken(
      lang,
      token
    );
  }

  @UseGuards(AdminGuard)
  @Post('logout')
  logout(
    @Request() req
  ) {
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : (req.body && req.body.token);
    return this.authadminService.logout(token);
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


