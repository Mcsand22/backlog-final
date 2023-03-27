import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  private secretKey = 'mySecretKey123'; // clave secreta para cifrar/descifrar

  // Función para guardar la sesión en el LocalStorage
  setSession(session: any): void {
    console.log('Guardando sesión en localStorage', session);

    // cifro los datos antes de guardarlos
    const encryptedSession = CryptoJS.AES.encrypt(JSON.stringify(session), this.secretKey).toString();

    localStorage.setItem('session', encryptedSession);
  }

  // Función para obtener la sesión del LocalStorage
  getSession(): any {
    const encryptedSession = localStorage.getItem('session');

    if (encryptedSession) {
      // Descifro los datos antes de devolverlos
      const decryptedSession = CryptoJS.AES.decrypt(encryptedSession, this.secretKey).toString(CryptoJS.enc.Utf8);

      return JSON.parse(decryptedSession);
    }

    return {};
  }
}
