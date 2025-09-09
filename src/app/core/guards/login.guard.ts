import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const user = JSON.parse(sessionStorage.getItem('session') as string);
  if (user) {
    router.navigate(['/dashboard']);
    return false;
  }
  return true;
};
