import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@guard/service/auth.service';
import { TokenStore } from '@core/token.store';
import { _PAGE_ADMIN_PROFILE, _PAGE_FINAL_PROFILE } from '@const/app.const';

export const indexGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const tokenStore = inject(TokenStore);
  const router = inject(Router);

  // Intentar recuperar sesión desde la cookie httpOnly
  if (!tokenStore.has()) {
    let ok = await authService.tryRefresh('admin');
    if (!ok) ok = await authService.tryRefresh('final');
    if (!ok) {
      return true; // sin sesión: mostrar home/login
    }
  }

  if (tokenStore.getRole() === 'admin') {
    router.navigate([_PAGE_ADMIN_PROFILE]);
    return false;
  }
  if (tokenStore.getRole() === 'final') {
    router.navigate([_PAGE_FINAL_PROFILE]);
    return false;
  }
  return true;
};
