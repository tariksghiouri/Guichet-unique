import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Request } from '../interface/request';

import { AuthService } from '../service/auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private AuthServiceS: AuthService, private RouterS: Router) {}
  // canActivate(): boolean {
  //   this.AuthServiceS.getProfile().subscribe((response: any) => {
  //     if (response.status === 200) {
  //       return true;
  //     } else {
  //       this.RouterS.navigate(['/auth/login']);
  //       return false;
  //     }
  //   });

  //   return true;
  // }

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.AuthServiceS.loggedIn()){
      return true;
    }
    // this.redirectUrl = state.url;
    this.RouterS.navigate(['/home']);
    return false;
  }
}
