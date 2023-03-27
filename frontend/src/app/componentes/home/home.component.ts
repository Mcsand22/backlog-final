import { Component } from '@angular/core';
import {BoardService} from "../../servicios/board.service";
import {LocalstorageService} from "../../servicios/localstorage.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {BoardModel} from "../../models/Board.model";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  session: any; // almaceno la sesión del usuario

  // Modelo de datos para un nuevo tablero
  board: BoardModel = {
    idboards: 0,
    tituloboard: 'Nuevo tablero',
    img: 'https://drive.google.com/uc?export=view&id=1GgUJ_3siOm01MonzQSzzpUkUnFslPhaE',
    usuario: { idusuarios: '' },
    cards: []
  };

  constructor(
    private boardService: BoardService, // Inyecto BoardService
    private localStorageService: LocalstorageService, // Inyecto LocalstorageService
    private router: Router, // Inyecto Router
    private http: HttpClient // Inyecto HttpClient
  ) {}

  // Método para crear un nuevo tablero
  createBoard() {
    this.boardService.createBoard(this.board).subscribe(board => {
      console.log(`El tablero ${board.tituloboard} se ha creado.`);
      location.href =`/board/${board.idboards}`; // Redirijo a la página del tablero
    });
  }
}
