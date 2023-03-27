import {Component, OnInit} from '@angular/core';
import {BoardService} from "../../../servicios/board.service";
import {HttpClient} from "@angular/common/http";
import {LocalstorageService} from "../../../servicios/localstorage.service";
import {Router} from "@angular/router";
import {BoardModel} from "../../../models/Board.model";

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css']
})
export class CarrouselComponent implements OnInit {

  boards: any[] = []; // Array todos los tableros
  boardContainers: any; // los contenedores de tableros
  nxtBtn: any; // boton derecho carrusel
  preBtn: any; // boton izquierdo carrusel
  session: any; // sesion en localstorage

  constructor(
    private boardService: BoardService, // inyecto BoardService
    private http: HttpClient,
    private localStorageService: LocalstorageService, // inyecto LocalstorageService
    private router: Router
  ) { }

  ngOnInit(): void {
    // obtengo todos los tableros de BoardService y los guardo en boards
    this.boardService.getAllBoards().subscribe((boards) => {
      this.boards = boards;
    });

    this.boardContainers = document.querySelectorAll(".board-container");
    this.nxtBtn = document.querySelectorAll(".nxt-btn");
    this.preBtn = document.querySelectorAll(".pre-btn");


    this.boardContainers.forEach((item: HTMLElement, i: number) => {
      let containerDimensions = item.getBoundingClientRect();
      let containerWidth = containerDimensions.width;


      this.nxtBtn[i].addEventListener("click", () => {
        console.log("pasando por el carrusel");
        item.scrollLeft += containerWidth;
      });


      this.preBtn[i].addEventListener("click", () => {
        console.log("pasando por el carrusel");
        item.scrollLeft -= containerWidth;
      });
    });
  }

  // Método para navegar a un tablero específico
  navigateToBoard(board: BoardModel) {
    // obtengo el tablero específico de BoardService y redirijo al tablero
    this.boardService.getBoard(board.idboards).subscribe(
      (boardData) => {
        location.href = `/board/${boardData.idboards}`;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
