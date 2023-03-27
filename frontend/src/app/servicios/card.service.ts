import {Injectable} from "@angular/core";
import {CardsModel} from "../models/Cards.model";
import {Observable} from "rxjs";
import {inProcessCardsModel} from "../models/inProcessCards.model";
import {doneCards} from "../models/Donecards.model";
import {HttpClient} from "@angular/common/http";
import {LocalstorageService} from "./localstorage.service";

@Injectable({
  providedIn: 'root'
})
export class CardService {
  // Arreglo de tarjetas
  card: CardsModel[] = [];
  // Arreglo de tarjetas en proceso
  inProcessCards: inProcessCardsModel[];
  // Arreglo de tarjetas completadas
  doneCards: doneCards[];

  // Rutas para hacer peticiones HTTP
  private readonly cardsPath = '/cards';
  private readonly baseUrl = 'http://localhost:8020';

  // Constructor que inyecta dependencias
  constructor(private http: HttpClient, private localStorageService: LocalstorageService) {
    // Inicializo los arreglos
    this.inProcessCards = [];
    this.doneCards = [];
  }

  // Función para crear una tarjeta
  createCard(boardId: number, newCard: CardsModel): Observable<any> {
    // creo la URL para la petición HTTP
    const url = `${this.baseUrl}/cards/board/${boardId}/create`;
    // hago la petición HTTP POST y se retorna la respuesta
    return this.http.post(url, newCard);
  }

  // Propiedad que retorna el arreglo de tarjetas
  get cards() {
    return this.card;
  }

  // Función para obtener las tarjetas de un tablero específico
  public getCardsByBoardId(boardId: number): Observable<CardsModel[]> {
    // creo la URL para la petición HTTP
    const url = `${this.baseUrl}${this.cardsPath}/${boardId}`;
    // hago la petición HTTP GET y se retorna la respuesta
    return this.http.get<CardsModel[]>(url);
  }

  // Función para actualizar una tarjeta
  updateCard(boardId: number, cardId: number, updatedCard: CardsModel): Observable<CardsModel> {
    // creo la URL para la petición HTTP
    const url = `${this.baseUrl}/cards/board/${boardId}/card/${cardId}/edit`;
    // Hago la petición HTTP PUT y se retorna la respuesta
    return this.http.put<CardsModel>(url, updatedCard);
  }

  // Función para obtener una tarjeta por su ID
  public getCardById(boardId: number, cardId?: number): Observable<CardsModel> {
    // creo la URL para la petición HTTP
    const url = `${this.baseUrl}/cards/${boardId}/card/${cardId}`;
    // hago la petición HTTP GET y se retorna la respuesta
    return this.http.get<CardsModel>(url);
  }

  // Función para eliminar una tarjeta
  deleteCard(boardId: number, cardId: number): Observable<any> {
    // creo la URL para la petición HTTP
    const url = `${this.baseUrl}/cards/board/${boardId}/card/${cardId}/delete`;
    // hago la petición HTTP DELETE y se retorna la respuesta
    return this.http.delete(url);
  }
}
