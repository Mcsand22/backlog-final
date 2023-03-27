import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { BoardService } from "../../servicios/board.service";
import { CardsModel } from "../../models/Cards.model";
import { CardsComponent } from './cards/cards.component';
import Swal from "sweetalert2";
import {LocalstorageService} from "../../servicios/localstorage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BoardModel} from "../../models/Board.model";
import {DomSanitizer} from "@angular/platform-browser";


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit {
  // @ViewChild para obtener una referencia 'contenedorLoader'
  @ViewChild('contenedorLoader') contenedorLoader!: ElementRef;

  backgroundImage = '';

  constructor(
    private localStorageService: LocalstorageService,
    private boardService: BoardService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  title: string;

  isEditing: boolean = false;

  session: any;

  board: any;

  cards: any;

  // Se define una instancia de SweetAlert2 con opciones personalizadas
  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger mr-2',
    },
    buttonsStyling: false,
  });

  // Se define el método ngOnInit
  ngOnInit(): void {
    // sesión actual a través de LocalstorageService
    this.session = this.localStorageService.getSession();

    const boardIdParam = this.route.snapshot.paramMap.get('boardId');

    // Si el parámetro 'boardId' no es nulo
    if (boardIdParam !== null) {
      const boardId = +boardIdParam;
      this.boardService.getBoard(boardId).subscribe((board) => {

        this.board = board;

        this.title = board.tituloboard;

        this.backgroundImage = `${board.img}`;
      });
    }
  }

  onEditClick() {
    // habilito edición
    this.isEditing = true;
  }


  onSaveClick() {
    // dehabilito edición
    this.isEditing = false;
    // obtengo 'boardId' de la URL
    const boardIdParam = this.route.snapshot.paramMap.get('boardId');
    // si no es null
    if (boardIdParam !== null) {
      // variable a número entero y lo asigno a 'boardId'
      const boardId = +boardIdParam;
      // traigo la sesion de localstorage
      const session = this.localStorageService.getSession();
      // guardo el id
      const idusuarios = session.idusuarios;
      // crep objeto 'board' con las propiedades actualizadas
      const board = {
        idboards: boardId,
        tituloboard: this.title,
        img: this.backgroundImage,
        usuario: { idusuarios: idusuarios },
        cards: [], // agrego la propiedad cards vacía
        estados: "",
      };


      this.boardService.updateBoard(idusuarios, boardId, board).subscribe(() => {
        // Después de guardar el tablero actualizado traigo los datos nuevos de la db
        this.boardService.getBoard(boardId).subscribe((board) => {
          this.board = board;
          this.title = board.tituloboard;
          this.backgroundImage = `(${board.img})`;
          this.cards = board.cards;
        });
      });
    }
  }
  async cambiarFondo() {
    const { value: imagen } = await Swal.fire({
      title: 'Selecciona una imagen',
      input: 'select',
      html: `
        <style>
           .containerBackground{
           display:flex;
           justify-content: space-around;
           }
        </style>
        <div class="containerBackground">
        <div>
        <img src="/assets/img/background.png" width="50" height="50" style="object-fit: cover; margin-right: 5px;">
         </div>
        <div>
         <img src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" width="50" height="50" style="object-fit: cover; margin-right: 5px;">
        </div>
        <div>
        <img src="https://images.unsplash.com/photo-1554147090-e1221a04a025?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1148&q=80" width="50" height="50" style="object-fit: cover; margin-right: 5px;">
        </div>
        <div>
        <img src="https://images.unsplash.com/photo-1620503374956-c942862f0372?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" width="50" height="50" style="object-fit: cover; margin-right: 5px;">
        </div>
        </div>
      `,
      inputOptions: {
        '/assets/img/background.png': 'Imagen 1',
        'https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80': 'Imagen 2',
        'https://images.unsplash.com/photo-1554147090-e1221a04a025?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1148&q=80': 'Imagen 3',
        'https://images.unsplash.com/photo-1620503374956-c942862f0372?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80': 'Imagen 4'
      },
      confirmButtonText: 'Seleccionar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true
    });
    let nuevaImagen;
    if (imagen) {
      nuevaImagen = imagen;
      // Actualizar la propiedad "img" del tablero en la base de datos
      const boardIdParam = this.route.snapshot.paramMap.get('boardId');
      if (boardIdParam !== null) {
        const boardId = +boardIdParam;
        const session = this.localStorageService.getSession();
        const idusuarios = session.idusuarios;
        const board = {
          idboards: boardId,
          tituloboard: this.title,
          img: nuevaImagen,
          usuario: {idusuarios: idusuarios},
          cards: [] // Agregar la propiedad cards vacía
        };
        this.boardService.updateBoard(idusuarios, boardId, board).subscribe(() => {
          // Después de guardar el tablero actualizado, obtener el tablero del servidor y asignar sus propiedades a las variables en el componente
          this.boardService.getBoard(boardId).subscribe((board) => {
            this.board = board;
            this.backgroundImage = `(${board.img})`;
            this.cards = board.cards;
          });
        });
      }
    }
  }

  deleteBoard(board: BoardModel) {
    // Se muestra un mensaje de confirmación

    this.swalWithBootstrapButtons.fire({
      title: '¿Estás seguro que querés eliminar este tablero?',
      heightAuto: false,
      text: '¡No vas a poder revertirlo!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, Cancelar',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // traigo el id del usuario de localstorage
        const session = this.localStorageService.getSession();
        const idusuarios = session.idusuarios;
        // guardo el id del tablero que voy a eliminar
        const idboards = board.idboards;

        // HTTP DELETE al servidor para que elimine el tablero correspondiente.
        this.boardService.deleteBoardByIdAndUsuarioId(idusuarios, idboards).subscribe(() => {
          this.swalWithBootstrapButtons.fire(
            'Eliminado',
            'El tablero fue eliminado',
            'success'
          );
          this.router.navigate(['/home']);
          this.boardService.getAllBoards();
        }, (error) => {
          console.error(error);
          this.swalWithBootstrapButtons.fire(
            'Error',
            'Ocurrió un error al eliminar el tablero',
            'error'
          );
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.swalWithBootstrapButtons.fire(
          'Cancelado',
          'Tu tablero fue salvado :)',
          'error'
        );
      }
    });
  }
  }

