import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {UsuarioService} from "../../servicios/usuario.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  // contiene la información de registro del usuario
  registerForm!: FormGroup;

  // boolean para indicar si las credenciales del usuario son inválidas
  credencialesInvalidas = false;

  // boolean para indicar si la contraseña del usuario debe mostrarse o no
  passwordVisible: boolean = false;

  // inyecto servicios y creo la instancia del FormGroup
  constructor(private formBuilder: FormBuilder, private http:HttpClient, private router: Router, private usuarioservice: UsuarioService) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      mail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Función contraseña visible o no
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    const passwordInput = document.getElementById('passwordRegister');
    if(passwordInput){
      if (this.passwordVisible) {
        passwordInput.setAttribute('type', 'text');
      } else {
        passwordInput.setAttribute('type', 'password');
      }
    }
  }

  // Función submit
  onSubmit(): void {
    console.log(this.registerForm.value);
    if (this.registerForm.invalid){ // Si el formulario no es válido, no hace nada y sale de la
      // función
      return ;
    } else {
      // Llamo a la función 'crearUsuario' del servicio 'UsuarioService' para crear un nuevo usuario
      this.usuarioservice.crearUsuario(
        this.registerForm.value.name,
        this.registerForm.value.lastname,
        this.registerForm.value.mail,
        this.registerForm.value.password
      ).subscribe(response => { // Si la petición es exitosa, muestro alert de confirmación y
        // redirijo a log in
        console.log(response);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario creado correctamente!',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/login']);
        this.registerForm.reset(); // Reinicio el formulario después de enviarlo
      }, error =>{
        console.log(error);
        this.credencialesInvalidas = true; // Si la petición no es exitosa,  boolean
        // 'credencialesInvalidas' = true
      });
    }
  }

}
