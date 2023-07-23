import { Component } from '@angular/core';
// Estamos declarando la funcion de jquery de nuestros archivos js app.js
declare var $: any;
declare function iniciarPaginaEcommerce([]): any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  /**
   *
   */
  constructor() {
    setTimeout(() => {
      iniciarPaginaEcommerce($);
    }, 50);//espera 50 milisegundos
  }

}
