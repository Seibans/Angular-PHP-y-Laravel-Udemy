import { Component, OnInit } from '@angular/core';


declare var $: any;
declare function iniciarPaginaEcommerce([]): any;

@Component({
  selector: 'app-auth-perfil',
  templateUrl: './auth-perfil.component.html',
  styleUrls: ['./auth-perfil.component.css']
})
export class AuthPerfilComponent implements OnInit{

  /**
   *
   */
  constructor() {
    
  }

  ngOnInit(): void {
    setTimeout(() => {
      iniciarPaginaEcommerce($);
    }, 50);//espera 50 milisegundos
  }

}
