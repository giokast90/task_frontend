import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

/**
 * Intercepts HTTP requests and appends the Authorization header
 * with a Bearer token if the token is available.
 *
 * @param req - The outgoing HTTP request.
 * @param next - The next handler in the pipeline for processing the request.
 * @returns The HTTP response after potentially modifying the request.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${ token }`,
      },
    });
    return next(cloned);
  }

  return next(req);
};
