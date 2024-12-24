import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const _cookies = inject(CookieService);

  const authToken = `Bearer ${_cookies.get('token')}`;

  if (req.url.includes('white_')) {
    const requestClone = req.clone({ url: req.url.replace('white_', '') });
    return next(requestClone);
  }

  const newReq = req.clone({
    headers: req.headers.append('Authorization', authToken),
  });
  return next(newReq);
};
