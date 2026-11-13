import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@guard/service/auth.service';
import { TokenStore } from '@core/token.store';
import { TranslateService } from '@ngx-translate/core';

export const adminGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const tokenStore = inject(TokenStore);
  const router = inject(Router);
  const translate = inject(TranslateService);

  if (!tokenStore.has()) {
    const ok = await authService.tryRefresh('admin');
    if (!ok) {
      const mensaje = translate.instant('mod-users.CONSOLE_ERROR_INVALID_TOKEN');
      console.log(mensaje);
      return router.navigate(['/']);
    }
  }

  if (tokenStore.getRole() === 'final') {
    const mensaje = translate.instant('mod-users.CONSOLE_MSJ_FORBIDDEN_TO_ADMIN');
    console.error(mensaje);
    return router.navigate(['/final']);
  }

  // Validar contra el backend (el interceptor refresca si expiró)
  const valid = await authService.isAuth('authadmin');
  if (!valid) {
    tokenStore.clear();
    return router.navigate(['/']);
  }

  return true;
};
