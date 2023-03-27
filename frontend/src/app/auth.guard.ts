import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {LocalstorageService} from "./servicios/localstorage.service";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private localStorage: LocalstorageService) {}

  canActivate(): boolean {
    const session = this.localStorage.getSession();
    if (session.idusuarios) {
      return true; // Permitir el acceso a la ruta
    } else {
      this.router.navigate(['/']); // Redirigir al usuario a la página de inicio de sesión
      return false;
    }
  }
}
