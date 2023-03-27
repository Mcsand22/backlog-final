import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, tap, throwError} from "rxjs";
import {Usuario} from "../models/Usuario";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  // Función para crear un usuario en el servidor
  crearUsuario(nombre: string, apellido: string, mail: string, contrasenia: string): Observable<any> {
    const usuarioCreado = {
      "nombre": nombre,
      "apellido": apellido,
      "mail": mail,
      "contrasenia": contrasenia
    }
    // hago una petición POST al servidor para crear el usuario
    return this.http.post("http://localhost:8020/usuarios/add", usuarioCreado);
  }

  // Variable boolean = credenciales ingresadas por el usuario son inválidas
  credencialesInvalidas = false;

  // Función para obtener boolean credencialesInvalidas
  public getCredencialesInvalidas(): boolean {
    return this.credencialesInvalidas;
  }

  // Función para realizar el login de un usuario en el servidor
  login(loginRequest: any): Observable<any> {
    return this.http.post<any>('http://localhost:8020/usuarios/login', loginRequest).pipe(
      catchError(error => {
        // Si se recibe un error 401 (credenciales inválidas), credencialesInvalidas = true
        if (error.status == 401) {
          console.log('Datos de acceso inválidos')
          this.credencialesInvalidas = true;
        } else {
          console.log(error)
        }
        return of(null);
      })
    );
  }

  // Método asincrónico (como tarda para que no bloquee otras operaciones) para actualizar la
  // información de un usuario en el servidor
  async actualizarUsuario(id: number, datosUsuario: any): Promise<void> {
    const url = `http://localhost:8020/usuarios/update/${id}`;
    // hago petición PUT al servidor para actualizar la información del usuario
    //indica que la ejecución debe esperar a que se complete la petición HTTP antes de
    // continuar con la siguiente línea
    await this.http.put(url, datosUsuario).toPromise();
  }

  // Variable que guarda la información del usuario
  private usuario: Usuario;

  // Función para obtener la información del usuario a partir de su id
  public getUsuario(id: number): Observable<Usuario> {
    const url = `http://localhost:8020/usuarios/${id}`;
    //  petición GET al servidor para obtener la información del usuario
    return this.http.get<Usuario>(url).pipe(
      tap((usuario: Usuario) => {
        this.usuario = usuario; // usuario = información del usuario
      }),
      catchError(error => {
        console.log(error);
        return throwError(error);
      })
    );
  }

}
