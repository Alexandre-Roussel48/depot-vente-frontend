import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    req = req.clone({
      withCredentials: true,
    });
  } else {
    authService.logout();
    router.navigate(['/login']);
  }

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        // Log out and redirect on 401 Unauthorized
        authService.logout();
        router.navigate(['/login']);
      }
      return throwError(error);
    })
  );
};
