export interface CardsModel {
  idcards?: number;      // opcional, ya que se genera automáticamente en el servidor
  titulocard: string;   // Título de la tarjeta
  descriptioncard: string;  // Descripción de la tarjeta
  editing: boolean;     // boolean = tarjeta siendo editada
  estados: string;      // Estado de la tarjeta
}
