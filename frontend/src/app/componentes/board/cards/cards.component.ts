import {Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';
import { BoardService } from "../../../servicios/board.service";
import { CardService } from "../../../servicios/card.service";
import { CdkDragDrop, CdkDragEnd, moveItemInArray } from "@angular/cdk/drag-drop";
import { CardsModel} from "../../../models/Cards.model";
import { doneCards } from "../../../models/Donecards.model";
import { inProcessCardsModel } from "../../../models/inProcessCards.model";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-card',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit{
  constructor(public cardservice: CardService, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {
  }

  @Input()
  card!: CardsModel;
  @Input()
  inProcessCards!: inProcessCardsModel;
  @Input()
  doneCards!: doneCards;

  boardId: number;

  cards: any = {
    titulocard: 'Title',
    description: 'Description',
    editing: false,
  };

  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger mr-2',
    },
    buttonsStyling: false,
  });

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.boardId = +params['boardId'];
      this.cardservice.getCardById(this.boardId, this.card.idcards).subscribe(card => {
        this.card = card; // agrego la asignación de la tarjeta
      });
    });
  }

  deleteCard(card: any) {
    const index = card.idcards;
    console.log(index)
    if (index >= 0) {
      this.swalWithBootstrapButtons.fire({
        title: "¿Estás seguro que querés eliminar esta task?",
        heightAuto: false,
        text: "¡No vas a poder revertirlo!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar",
        cancelButtonText: "No, Cancelar",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.cardservice.deleteCard(this.boardId, card.idcards).subscribe(() => {
            this.swalWithBootstrapButtons.fire(
              "Eliminado",
              "La task fue eliminada",
              "success"
            );
            this.cardservice.getCardsByBoardId(this.boardId).subscribe((cards) => {
              if (cards && cards.length > 0) {
                console.log(cards)
                this.cardservice.card = cards;

                //Obtengo las tarjetas en todo
                this.cardservice.card = cards.filter(card => card.estados === 'todo');
                // Obtengo las tarjetas en proceso
                this.cardservice.inProcessCards = cards.filter(card => card.estados === 'process');

                // Obtengo las tarjetas completadas
                this.cardservice.doneCards = cards.filter(card => card.estados === 'done');
              } else {
                this.cardservice.card = cards;

                // Si no hay tarjetas, establezco las variables como arrays vacíos
                this.cardservice.inProcessCards = [];
                this.cardservice.doneCards = [];
              }
            });
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.swalWithBootstrapButtons.fire(
            "Cancelado",
            "Tu card fue salvada :)",
            "error"
          );
        }
      });
    }
  }


  saveCard() {
    if (this.card && this.card.idcards !== undefined) {
      const cardId = this.card.idcards;
      this.cardservice.updateCard(this.boardId, cardId, this.card).subscribe(updatedCard => {
        console.log('Updated card:', updatedCard);
      });
    }
    this.card.editing = false;
  }
}
