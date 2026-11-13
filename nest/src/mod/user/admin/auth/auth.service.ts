import { Injectable, NotFoundException, UnauthorizedException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { AdminService } from '@module/user/admin/user/admin.service';
import { JwtService } from '@nestjs/jwt';

import { jwtConstants } from '@guard/secret_key';
import { TokenBlacklistService } from '@global/services/token-blacklist.service';

import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { execFileSync } from 'child_process';

import { I18nService } from 'nestjs-i18n';

import { CreateAuthadminDto } from './dto/create-auth.dto';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AuthadminService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
    private i18n: I18nService,
    private blacklist: TokenBlacklistService
  ) {}
  
  async signIn(
    lang: string,
    createAdminDto: CreateAuthadminDto
  ): Promise<any> {
    const user = await this.adminService.findUsernameEmail(createAdminDto.username);
    if(!user || user == null){
      throw new NotFoundException(
        this.i18n.t('auth.ERROR', { lang }), { cause: new Error(), description: this.i18n.t('auth.MSN_NOT_REGISTER', { lang }) }
      );
    }
    if(user.isActive == false){
      throw new NotFoundException(
        this.i18n.t('auth.ERROR', { lang }), { cause: new Error(), description: this.i18n.t('auth.MSN_IS_DESACTIVED', { lang }) }
      );
    }

    // Bloqueo por intentos fallidos
    const lockStatus = await this.adminService.getLockStatus(user.email);
    if (lockStatus.locked) {
      const mins = Math.ceil((new Date(lockStatus.until!).getTime() - Date.now()) / 60000);
      throw new NotFoundException(
        this.i18n.t('auth.ERROR', { lang }), { cause: new Error(), description: `Usuario bloqueado por intentos fallidos. Intente en ${mins} minuto(s).` }
      );
    }

    let passwordMatch = false;
    if (user.password && user.password.startsWith('$2')) {
      passwordMatch = await bcrypt.compare(createAdminDto.pass, user.password);
    } else {
      passwordMatch = user.password === createAdminDto.pass;
      if (passwordMatch) {
        const hashed = await bcrypt.hash(createAdminDto.pass, 10);
        await this.adminService.updatePasswordHash(user.id, hashed);
      }
    }
    if (!passwordMatch) {
      const res = await this.adminService.recordFailedAttempt(user.email);
      if (res.locked) {
        const mins = this.adminService.getLockoutMinutes();
        throw new NotFoundException(
          this.i18n.t('auth.ERROR', { lang }), { cause: new Error(), description: `Usuario bloqueado por ${mins} minutos por intentos fallidos.` }
        );
      }
      throw new NotFoundException(
        this.i18n.t('auth.ERROR', { lang }), { cause: new Error(), description: this.i18n.t('auth.PASSWORD_INVALID', { lang }) }
      );
    }

    await this.adminService.resetLoginAttempts(user.email);
    const payload = { id: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync({ ...payload, type: 'access' }),
      refresh_token: await this.jwtService.signAsync({ ...payload, type: 'refresh' }, { expiresIn: '7d' }),
    };
  }

  async refreshToken(
    lang: string,
    tokenDto: TokenDto
  ): Promise<any> {
    if (this.blacklist.isRevoked(tokenDto.token)) {
      throw new NotFoundException(
        this.i18n.t('auth.ERROR', { lang }), { cause: new Error(), description: this.i18n.t('auth.MSN_INVALID', { lang }) }
      );
    }
    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(tokenDto.token, { secret: jwtConstants.secretAdmin });
    } catch (e) {
      throw new NotFoundException(
        this.i18n.t('auth.ERROR', { lang }), { cause: new Error(), description: this.i18n.t('auth.MSN_INVALID', { lang }) }
      );
    }
    if (!payload || !payload.email) {
      throw new NotFoundException(
        this.i18n.t('auth.ERROR', { lang }), { cause: new Error(), description: this.i18n.t('auth.MSN_INVALID', { lang }) }
      );
    }
    // Recomendación 3: solo tokens de tipo refresh pueden usarse para refrescar
    if (payload.type !== 'refresh') {
      throw new NotFoundException(
        this.i18n.t('auth.ERROR', { lang }), { cause: new Error(), description: this.i18n.t('auth.MSN_INVALID', { lang }) }
      );
    }
    const user = await this.adminService.findUsernameEmail(payload.email);
    if (!user) {
      throw new NotFoundException(
        this.i18n.t('auth.ERROR', { lang }), { cause: new Error(), description: this.i18n.t('auth.MSN_NOT_REGISTER', { lang }) }
      );
    }
    // Revocar el token usado (rotación)
    try {
      const decoded: any = this.jwtService.decode(tokenDto.token);
      const expMs = (decoded?.exp ? decoded.exp * 1000 : Date.now() + 3600000);
      this.blacklist.revoke(tokenDto.token, expMs);
    } catch {}

    const newPayload = { id: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync({ ...newPayload, type: 'access' }),
      refresh_token: await this.jwtService.signAsync({ ...newPayload, type: 'refresh' }, { expiresIn: '7d' }),
    };
  }

  async getProfile(lang: string, id: number): Promise<any> {
    const user = await this.adminService.findOne(lang, id);
    if (!user) {
      throw new NotFoundException(
        this.i18n.t('auth.ERROR', { lang }), { cause: new Error(), description: this.i18n.t('auth.MSN_NOT_REGISTER', { lang }) }
      );
    }
    const { password, ...rest } = user as any;
    return rest;
  }

  async resetPassword(lang: string, username: string): Promise<{ buffer: Buffer; filename: string }> {
    const user = await this.adminService.findUsernameEmail(username);
    if (!user) {
      throw new NotFoundException(
        this.i18n.t('auth.ERROR', { lang }), { cause: new Error(), description: this.i18n.t('auth.MSN_NOT_REGISTER', { lang }) }
      );
    }
    const newPassword = this.generatePassword();
    const hashed = await bcrypt.hash(newPassword, 10);
    await this.adminService.updatePasswordHash(user.id, hashed);

    const buffer = this.createProtectedZip(user.email, newPassword);
    return { buffer, filename: `password_${user.id}.zip` };
  }

  private generatePassword(length: number = 12): string {
    const crypto = require('crypto');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';
    let p = '';
    const bytes = crypto.randomBytes(length);
    for (let i = 0; i < length; i++) p += chars[bytes[i] % chars.length];
    return p;
  }

  private createProtectedZip(email: string, password: string): Buffer {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'pwd-'));
    const filePath = path.join(tmpDir, 'password.txt');
    fs.writeFileSync(filePath, `email: ${email}\npassword: ${password}\n`);
    const zipPath = path.join(tmpDir, 'password.zip');
    execFileSync('zip', ['-P', email, '-j', zipPath, filePath], { cwd: tmpDir });
    const buffer = fs.readFileSync(zipPath);
    try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
    return buffer;
  }

  async logout(token: string) {
    try {
      const decoded: any = this.jwtService.decode(token);
      const expMs = decoded?.exp ? decoded.exp * 1000 : Date.now() + 3600000;
      this.blacklist.revoke(token, expMs);
    } catch {}
    return { message: 'Sesión cerrada' };
  }
}
