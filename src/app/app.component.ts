import { Component } from '@angular/core';
// Estamos declarando la funcion de jquery de nuestros archivos js app.js
declare var $: any;
declare function iniciarPaginaEcommerce([]): any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecommerce';
  constructor(){
    setTimeout(() => {
      iniciarPaginaEcommerce($);
    }, 50);//espera 50 milisegundos
  }
}
