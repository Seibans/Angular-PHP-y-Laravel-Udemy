import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private authervice: AuthService,
    private router: Router,
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.authervice.user && !this.authervice.token){
        this.router.navigate(["/auth/login"]);
        return false;
      }

      let token = this.authervice.token;
      //TODO: atob desencripta el token hace que te devuelva un array de 3 elementos y toma la pos 2
      let expiracion = (JSON.parse(atob(token.split('.')[1]))).exp;
      if(Math.floor((new Date).getTime() / 1000) >= expiracion){
        this.authervice.logout();
        return false;
      }
      return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}
