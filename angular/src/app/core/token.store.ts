import { Injectable } from '@angular/core';

export type AuthRole = 'admin' | 'final';

// Estado en memoria (módulo) accesible también fuera de DI (interceptores)
let _accessToken: string | null = null;
let _role: AuthRole | null = null;

export function getAccessToken(): string | null {
  return _accessToken;
}

export function getAuthRole(): AuthRole | null {
  return _role;
}

export function setAccessToken(token: string, role: AuthRole): void {
  _accessToken = token;
  _role = role;
}

export function clearAccessToken(): void {
  _accessToken = null;
  _role = null;
}

@Injectable({ providedIn: 'root' })
export class TokenStore {
  set(token: string, role: AuthRole): void {
    setAccessToken(token, role);
  }

  get(): string | null {
    return getAccessToken();
  }

  getRole(): AuthRole | null {
    return getAuthRole();
  }

  has(): boolean {
    return !!_accessToken;
  }

  clear(): void {
    clearAccessToken();
  }
}
