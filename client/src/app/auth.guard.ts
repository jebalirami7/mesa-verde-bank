import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const reclamationGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router)
  if (auth.isLoggedIn() ) {
    return true ;
  }
  else {
    router.navigate(['/login']);
    return false ;
  }
};


export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router)
  if (auth.isLoggedIn() === false ) {
    return true ;
  }
  else {
    router.navigate(['/reclamations/all']);
    return false;
  }
};