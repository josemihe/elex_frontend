import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "./login.service";

export const canActivateGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    const loginService = inject(LoginService);
    const token = loginService.userToken; // Get the token from LoginService
  
    if (token) {
      return true;
    } else {
      inject(Router).navigate(['/login']);
      return false;
    }
  };