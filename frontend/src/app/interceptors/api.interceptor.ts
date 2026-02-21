import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const cloned = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
    },
  });

  console.log('HTTP Request:', req.url);
  return next(cloned);
};
