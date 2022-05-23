import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService,private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.loggedIn) { // determine if the uder is logged in from this method.
      return true;
    } else {
      let user = this.authService.currentUser;
      // this.user_id = user.userid;
      // this.user_name= user.user_name;
      if (user.role==1) {
        this.router.navigate(['/dashboard/admin']);
      } else {
        this.router.navigate(['/dashboard/employee']);
      }
      return false;
     

    }
  }
  
}
