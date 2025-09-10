import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { IUser } from '../models/user.interface';

export const gerenteGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const user: IUser = JSON.parse(sessionStorage.getItem('session') as string);
  if (user.role != 'manager') {
    router.navigate(['/dashboard']);
    return false;
  }
  return true;
};
