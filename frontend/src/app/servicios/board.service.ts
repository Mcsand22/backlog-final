import { Injectable } from '@angular/core';
import { CardsModel } from "../models/Cards.model";
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {LocalstorageService} from "./localstorage.service";
import {BoardModel} from "../models/Board.model";
import { inProcessCardsModel } from "../models/inProcessCards.model";
import { doneCards } from "../models/Donecards.model";

@Injectable({
  providedIn: 'root'
})
export class BoardService{

  card: CardsModel[] = []; // arreglo de tarjetas (cards) que pertenecen a un tablero
  inProcessCards: inProcessCardsModel[]; // arreglo de tarjetas que están en proceso
  doneCards: doneCards[]; // arreglo de tarjetas que están completadas

  // el constructor de la clase y algunas propiedades privadas que serán inyectadas
  constructor(private http: HttpClient, private localStorageService: LocalstorageService) {
    this.inProcessCards = [], // inicializo el arreglo de tarjetas en proceso como vacío
      this.doneCards = [] // inicializo el arreglo de tarjetas completadas como vacío
  }

  // Rutas para hacer peticiones HTTP
  private readonly baseUrl = 'http://localhost:8020';
  private readonly boardsPath = '/boards';


// Función para obtener todos los tableros
  public getAllBoards(): Observable<BoardModel[]> {
    // Obtengo la sesión del usuario desde el servicio de local y la desencripto
    const session = this.localStorageService.getSession();
    // Obtengo el ID del usuario de la sesión
    const idusuarios = session.idusuarios;
    // la URL para obtener todos los tableros del usuario
    const url = `${this.baseUrl}${this.boardsPath}/${idusuarios}`;
    //una solicitud GET a la URL y retorno la respuesta como un observable (emite valores a lo
    // largo del tiempo y puede ser observado (subscrito) para recibir esos valores, me permite
    // trabajar con flujos asincronos = que no se obtiene toda la información en un solo momento, sino que se va recibiendo a medida que se va produciendo)
    return this.http.get<BoardModel[]>(url).pipe(
      // Realizo una transformación de los datos recibidos para cambiar el nombre de una propiedad
      map((boards: BoardModel[]) => boards.map((board: BoardModel) => ({ ...board, idboards: board.idboards })))
    );
  }

// Función para crear un nuevo tablero
  public createBoard(board: BoardModel): Observable<BoardModel> {
    // Obtengo la sesión del usuario desde el servicio de local y la desencripto
    const session = this.localStorageService.getSession();
    // Obtengo el ID del usuario de la sesión
    const idusuarios = session.idusuarios;
    // la URL para crear un nuevo tablero para el usuario
    const url = `${this.baseUrl}${this.boardsPath}/${idusuarios}/boards`;
    //una solicitud POST a la URL con los datos del nuevo tablero y retorno la respuesta como un
    // observable
    return this.http.post<BoardModel>(url, board);
  }

  // Función para obtener un tablero por el boardID
  getBoard(boardId: number): Observable<BoardModel> {
    const session = this.localStorageService.getSession();
    const idusuarios = session.idusuarios;
    const url = `${this.baseUrl}${this.boardsPath}/${idusuarios}/board/${boardId}`;
    return this.http.get<BoardModel>(url);
  }

  // Función para actualizar un tablero por el boardID y el ID del usuario
  public updateBoard(idusuarios: string, boardId: number, updatedBoard: BoardModel): Observable<BoardModel> {
    const url = `${this.baseUrl}${this.boardsPath}/${idusuarios}/board/${boardId}/update`;

    return this.http.put<BoardModel>(url, updatedBoard);
  }


// Función para borrar un tablero por boardID y ID de usuario
  public deleteBoardByIdAndUsuarioId(idusuarios: string, idboards: number): Observable<any> {
    const url = `${this.baseUrl}${this.boardsPath}/${idusuarios}/board/${idboards}`;
    return this.http.delete(url);
  }


}
