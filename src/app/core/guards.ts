import { inject } from '@angular/core';import { CanActivateFn, Router } from '@angular/router';import { AuthService } from '../services/auth.service';
export const authGuard:CanActivateFn=()=>inject(AuthService).isLoggedIn()?true:inject(Router).createUrlTree(['/login']);
export const adminGuard:CanActivateFn=()=>inject(AuthService).user()?.role==='ADMIN'?true:inject(Router).createUrlTree(['/dashboard']);
