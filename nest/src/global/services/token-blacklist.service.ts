import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenBlacklistService {
  private store = new Map<string, number>();

  revoke(token: string, expiresAtMs: number) {
    this.store.set(token, expiresAtMs);
  }

  isRevoked(token: string): boolean {
    const exp = this.store.get(token);
    if (exp === undefined) return false;
    if (Date.now() > exp) {
      this.store.delete(token);
      return false;
    }
    return true;
  }
}