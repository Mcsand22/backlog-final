import {CardsModel} from "./Cards.model";

// interfaz BoardModel
export interface BoardModel {
  // el ID del tablero
  idboards: number;

  // el título del tablero
  tituloboard: string;

  // la imagen asociada al tablero
  img: string;

  // el usuario dueño del tablero
  usuario: {
    // el ID del usuario
    idusuarios: string;
  }

  // las tarjetas asociadas al tablero
  cards: CardsModel[];
}
