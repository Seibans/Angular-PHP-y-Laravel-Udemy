import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthPerfilRoutingModule } from './auth-perfil-routing.module';
import { AuthPerfilComponent } from './auth-perfil.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegistroComponent } from './registro/registro.component';


@NgModule({
  declarations: [
    AuthPerfilComponent,
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
    AuthPerfilRoutingModule,
    SharedModule
  ]
})
export class AuthPerfilModule { }
