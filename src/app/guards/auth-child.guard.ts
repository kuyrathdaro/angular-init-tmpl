import { CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authChildGuard: CanActivateChildFn = (childRoute, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const hasPermission = true; //TODO: set permission on route data
  if (!authService.isAuth) {
    const returnUrl = state.url;
    router.navigate(['/login'], { queryParams: { returnUrl } });
    return false;
  } else if (hasPermission) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
