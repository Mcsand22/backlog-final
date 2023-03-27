import {Component, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {LocalstorageService} from "../../servicios/localstorage.service";
import {Router} from "@angular/router";
import * as CryptoJS from 'crypto-js';
import {HttpClient} from "@angular/common/http";
import {Usuario} from "../../models/Usuario";
import {UsuarioService} from "../../servicios/usuario.service";




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

// referencias a los elementos del formulario
  nameInput!: HTMLInputElement;
  lastnameInput!: HTMLInputElement;
  mailInput!: HTMLInputElement;
  passInput!: HTMLInputElement;

  editing = false;

  session: any;

  private readonlyInputs: boolean = true;

  avatarUrl: string | null = null;

  passwordVisible: boolean = false;

  constructor(private localStorageService: LocalstorageService, private router: Router, private localStorage: LocalstorageService, private http: HttpClient, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
// la sesión del usuario del local storage al iniciar el componente(desencripto)
    this.session = this.localStorageService.getSession();
// Muestro los datos del usuario en el formulario
    this.showUserData();
  }

  showUserData(): void {
// el id del usuario de la sesión
    const id = this.session.idusuarios;
// obtengo los datos del usuario mediante 'usuarioService'
    this.usuarioService.getUsuario(id).subscribe(usuario => {
// Asigno los datos del usuario a los input del formulario
      this.nameInput = document.getElementById('nameProfile') as HTMLInputElement;
      this.nameInput.value = usuario.nombre;
      this.lastnameInput = document.getElementById('lastnameProfile') as HTMLInputElement;
      this.lastnameInput.value = usuario.apellido;
      this.mailInput = document.getElementById('mailProfile') as HTMLInputElement;
      this.mailInput.value = usuario.mail;
      this.passInput = document.getElementById('passProfile') as HTMLInputElement;
      this.passInput.value = usuario.contrasenia;
      this.avatarUrl = usuario.img;
    }, error => {
      console.log(error);
    });
  }

  // Función para cerrar sesión
  logOut() {
    // elimino 'session' del LocalStorage
    localStorage.removeItem('session');
    // voy a index
    this.router.navigate(['/']);
  }

// Función para editar perfil
  onEditProfile(): void {
    // boolean editing = true para permitir la edición
    this.editing = true;
    this.nameInput.readOnly = false;
    this.lastnameInput.readOnly = false;
    this.mailInput.readOnly = false;
    this.passInput.readOnly = false;
  }

// Función para ver contraseña
  togglePasswordVisibility() {
    // cambio boolean passwordvisible
    this.passwordVisible = !this.passwordVisible;
    // elemento html pass
    const passwordInput = document.getElementById('passProfile');
    if(passwordInput){
      // si debe ser visible: type 'text'
      if (this.passwordVisible) {
        passwordInput.setAttribute('type', 'text');
      } else {
        // si no debe ser visible: type 'password'
        passwordInput.setAttribute('type', 'password');
      }
    }
  }

// Función para guardar los cambios del usuario
  async onSaveProfile() {
    // cro un objeto con los datos del usuario actualizados
    const usuarioActualizado = {
      nombre: this.nameInput.value,
      apellido: this.lastnameInput.value,
      mail: this.mailInput.value,
      contrasenia: this.passInput.value,
      img: this.avatarUrl
    };
    // traigo id almacenado en localstorage
    const id = this.session.idusuarios;

    try {
      // actualizo los datos del usuario en el servidor usando 'usuarioService'
      await this.usuarioService.actualizarUsuario(id, usuarioActualizado);
      // deshabilito editing = false
      this.editing = false;
      // Muestro el perfil del usuario actualizado
      this.showUserData();
    } catch (error) {
      // Si hay un error, lo muestro en la consola
      console.log(error);
    }
  }

  async buscarGithub() {
    // Pido nombre de usuario de GitHub
    const { value: username } = await Swal.fire({
      title: 'Subí tu foto de perfil de Github',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Buscar',
      showLoaderOnConfirm: true,
      preConfirm: async (username) => { // Función async la ejecuto antes de la confirmación
        try {
          // Obtengo los datos del usuario desde la API de GitHub
          const response = await fetch(`https://api.github.com/users/${username}`);
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          const data = await response.json();
          const imageUrl = data.avatar_url; // URL del avatar del usuario

          // Actualizo el perfil del usuario con la nueva URL de imagen
          const id = this.session.idusuarios;
          await this.usuarioService.actualizarUsuario(id, {
            nombre: this.nameInput.value,
            apellido: this.lastnameInput.value,
            mail: this.mailInput.value,
            contrasenia: this.passInput.value,
            img: imageUrl
          });

          return imageUrl; // la URL de la imagen para confirmación
        } catch (error) {
          Swal.showValidationMessage(`No encontramos tu perfil: ${error}`); // Muestro mensaje de
          // error si no se encuentra el usuario
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    });

    if (username) {
      try {
        // Obtengo avatar del usuario desde la URL
        const response = await fetch(username);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        this.avatarUrl = username; // la URL del avatar del usuario como propiedad del
        // objeto
      } catch (error) {
        // Muestro mensaje de error si la imagen no se carga
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error cargando tu imagen de perfi. Por favor, intenta nuevamente.',
        });
        console.error(error); // Registro el error en la consola
      }
    }
  }
}
