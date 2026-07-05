import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const user = sessionStorage.getItem('user') ?? localStorage.getItem('user');

  if (user) {
    const { access_token } = JSON.parse(user);

    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${access_token}`
      }
    });
    return next(cloned);
  }

  return next(req);
};
