import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const permissionGuard: CanActivateFn = () => {
  const _cookies = inject(CookieService);
  const _router = inject(Router);

  const token = _cookies.get('token') || null;
  if (token && token !== '') {
    return true;
  }
  _router.navigateByUrl('/login');
  return false;
};
