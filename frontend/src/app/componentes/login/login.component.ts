import {Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {Router} from "@angular/router";
import {LocalstorageService} from "../../servicios/localstorage.service";
import {Usuario} from '../../models/Usuario';
import Swal from "sweetalert2";
import {UsuarioService} from "../../servicios/usuario.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;

  // Constructor que inicializa el formulario y los servicios
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private localStorageService: LocalstorageService, private usuarioService: UsuarioService) {
    this.loginForm = this.formBuilder.group({
      mail: ['', [Validators.required, Validators.email]], // campo mail requerido y debe ser una dirección de correo electrónico válida
      password: ['', Validators.required] // campo password requerido
    });
  }

  mailIngresado: string = ''; // el correo electrónico ingresado por el usuario
  passIngresada: string = ''; // la contraseña ingresada por el usuario

  // Función booleano credenciales ingresadas son inválidas
  get credencialesInvalidas(): boolean {
    return this.usuarioService.getCredencialesInvalidas();
  }

  passwordVisible: boolean = false; // indica si la contraseña debe mostrarse o no

  // Función boton ver contraseña
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible; // cambio boolean
    const passwordInput = document.getElementById('passwordLogIn'); // obtengo html passwordLogin
    if (passwordInput) {
      if (this.passwordVisible) { // passwordVisible =true se muestra la contraseña
        passwordInput.setAttribute('type', 'text');
      } else {
        passwordInput.setAttribute('type', 'password');
      }
    }
  }

  // funcion submit
  onSubmit(): void {
    this.mailIngresado = this.loginForm.get("mail")?.value; // correo electrónico ingresado por el usuario
    this.passIngresada = this.loginForm.get("password")?.value; // contraseña ingresada por el usuario
    const loginRequest = { // creo un objeto con las credenciales ingresadas
      mail: this.mailIngresado,
      contrasenia: this.passIngresada
    };

    this.usuarioService.login(loginRequest).subscribe(response => {
      if (response) { // Si se obtiene una respuesta, se muestra un mensaje de éxito y redirijo home
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Bienvenidx!',
          showConfirmButton: false,
          timer: 1500
        })
        console.log(response);
        this.localStorageService.setSession(response); // guardo la sesión en el LocalStorage
        this.router.navigate(['/home']); // redirijo al usuario al home
      }
    });
  }

}
