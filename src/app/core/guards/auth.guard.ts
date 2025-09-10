import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const user = JSON.parse(sessionStorage.getItem('session') as string);
  if (!user) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
