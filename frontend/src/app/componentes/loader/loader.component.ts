import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';


@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent{

  @ViewChild('contenedorLoader') contenedorLoader!: ElementRef; // elemento HTML que contiene el loader

  ngAfterViewInit(): void {
    const contenedorLoader = this.contenedorLoader.nativeElement; // el elemento HTML que contiene el loader
    setTimeout(() => {
      contenedorLoader.style.opacity = '0'; // oculto el loader cambiando la opacidad a 0
      contenedorLoader.classList.add('hidden'); // agrego "hidden"
    }, 300); // el loader se oculta después de 300ms
  }

  constructor(private elementRef: ElementRef) {}
}
