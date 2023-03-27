import {Component, Input, OnInit} from '@angular/core';
import { BoardService } from "../../../servicios/board.service";
import { CardService } from "../../../servicios/card.service";
import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { CardsModel } from 'src/app/models/Cards.model';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent implements OnInit{
  constructor(public cardservice:CardService, public boardservice: BoardService, private route: ActivatedRoute, private router: Router) { }

  @Input()
  card!: CardsModel;
  newCard: CardsModel = {
    titulocard: '',
    descriptioncard: '',
    editing: false,
    estados: "todo"
  };

  todo="todo";
  process="process";
  done="done";
  showForm = false;
  boardId: number;


  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      // obtengo id del tablero actual
      this.boardId = Number(params.get('boardId'));
      // traigo todas las tarjetas asociadas a ese tablero
      this.cardservice.getCardsByBoardId(this.boardId).subscribe((cards) => {
        if (cards && cards.length > 0) {
          for(let i = 0; i < cards.length; i++){
            // verifico el estado de cada tarjeta y la agrego a la lista correspondiente
            if(cards[i].estados== "todo"){
              let card = cards[i]
              this.cardservice.card.push(card);
            } else if(cards[i].estados == "process"){
              let card = cards[i]
              this.cardservice.inProcessCards.push(card);
            } else{
              let card = cards[i]
              this.cardservice.doneCards.push(card)
            }
          }
          console.log(cards)
        } else {
          console.log('No se encontraron tarjetas para el tablero con el ID especificado');
        }
      });
    });
  }

  createCard() {
    this.cardservice.createCard(this.boardId, this.newCard).subscribe((createdCard: CardsModel) => {
      // Ssi creo la tarjeta, la agrego al arreglo de tarjetas en el servicio
      this.cardservice.cards.push(createdCard);
      // reinicio el objeto newCard para poder agregar otra tarjeta
      this.newCard = {
        titulocard: '',
        descriptioncard: '',
        editing: false,
        estados: 'todo',
      };
    });
    // oculto el formulario para crear tarjetas
    this.showForm = false;
  }



  drop(event: CdkDragDrop<CardsModel[]>) {
    console.log(event.item.data.id)
    if (event.previousContainer === event.container) {
      // Si la tarjeta se mueve dentro del mismo contenedor dejo modificar el orden
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else if (event.container.id === 'taskContainerToDo') {
      console.log(event.container)
      // Si la tarjeta se ha movido al contenedor todo, actualizo estado
      this.cardservice.getCardById(this.boardId, event.item.data.id).subscribe(card => {
        this.card = card; // agrego la asignación de la tarjeta
        this.card.estados = "todo"
        this.cardservice.updateCard(this.boardId, event.item.data.id,
          this.card).subscribe(updatedCard => {
          console.log('Updated card:', updatedCard);
        });
      });
      // muevo tarjeta a todo
      transferArrayItem(
        this.cardservice.inProcessCards,
        this.cardservice.cards,
        event.previousIndex,
        event.currentIndex,
      );
    } else if (event.container.id === 'taskContainerProcess' && event.previousContainer.id === 'taskContainerDone') {
      this.cardservice.getCardById(this.boardId, event.item.data.id).subscribe(card => {
        this.card = card; // Agregar la asignación de la tarjeta
        this.card.estados = "process"
        this.cardservice.updateCard(this.boardId, event.item.data.id,
          this.card).subscribe(updatedCard => {
          console.log('Updated card:', updatedCard);
        });
      });
      transferArrayItem(
        event.previousContainer.data,
        this.cardservice.inProcessCards,
        event.previousIndex,
        event.currentIndex
      );
    } else if (event.container.id === 'taskContainerProcess') {
      this.cardservice.getCardById(this.boardId, event.item.data.id).subscribe(card => {
        this.card = card; // agrego la asignación de la tarjeta
        this.card.estados = "process"
        this.cardservice.updateCard(this.boardId, event.item.data.id,
          this.card).subscribe(updatedCard => {
          console.log('Updated card:', updatedCard);
        });
      });
      transferArrayItem(
        this.cardservice.cards,
        this.cardservice.inProcessCards,
        event.previousIndex,
        event.currentIndex
      );
    } else if (event.container.id === 'taskContainerDone' && event.previousContainer.id === 'taskContainerProcess') {
      this.cardservice.getCardById(this.boardId, event.item.data.id).subscribe(card => {
        this.card = card; // agrego la asignación de la tarjeta
        this.card.estados = "done"
        this.cardservice.updateCard(this.boardId, event.item.data.id,
          this.card).subscribe(updatedCard => {
          console.log('Updated card:', updatedCard);
        });
      });
      transferArrayItem(
        event.previousContainer.data,
        this.cardservice.doneCards,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
