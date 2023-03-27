import {Component, OnInit} from '@angular/core';
import {ModoOscuroService} from "../../servicios/modooscuro.service";

@Component({
  selector: 'app-darkmode',
  templateUrl: './darkmode.component.html',
  styleUrls: ['./darkmode.component.css']
})
export class DarkmodeComponent implements OnInit{
  modoOscuro: boolean;

  constructor(private modoOscuroService: ModoOscuroService) { }

  ngOnInit(): void {
    // Valor actual del modo oscuro desde el servicio
    this.modoOscuro = this.modoOscuroService.getModoOscuro();
    this.setModoOscuro();
  }

  toggleModoOscuro() {
    // Al cambiar el modo oscuro, actualizo el servicio
    this.modoOscuroService.toggleModoOscuro();
    // obtengo valor del modo oscuro desde el servicio
    this.modoOscuro = this.modoOscuroService.getModoOscuro();
    // Se aplica el modo oscuro actualizado
    this.setModoOscuro();
    // actualiza su icono
    const button = document.getElementsByClassName('darkmode')[0];
    button.innerHTML = this.modoOscuro ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  }

  setModoOscuro() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.toggle('modo-oscuro', this.modoOscuro);
    if((document.getElementsByClassName('pre-btn').length > 0 && document.getElementsByClassName('nxt-btn').length > 0)){
      const preBtn = document.getElementsByClassName('pre-btn')[0];
      preBtn.classList.toggle('modo-oscuro', this.modoOscuro);
      const nxtBtn = document.getElementsByClassName('nxt-btn')[0];
      nxtBtn.classList.toggle('modo-oscuro', this.modoOscuro);
    }
  }
}
