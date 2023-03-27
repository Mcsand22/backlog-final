import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuardGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const session = localStorage.getItem('session');
    if (session) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }

}
