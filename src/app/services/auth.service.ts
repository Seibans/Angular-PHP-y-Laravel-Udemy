import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from '../config/config';
import { map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:any;
  token:any = "";

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    //tiene que cargarse el usuario y el token
    this.loadStorage();
  }

  loadStorage(){
    if(localStorage.getItem("token")){
      this.token = localStorage.getItem("token");
      this.user = JSON.parse(localStorage.getItem("user") ?? "");
    }else{
      this.user = "";
      this.token = null;
    }
  }

  login(email: string, password: string){
    let url = URL_SERVICIOS+"/users/login_ecommerce";
    //El pipe hace que la respuesta llegue aca antes del componente
    return this.http.post(url, {email, password}).pipe(
      map((resp: any)=>{
        if(resp.access_token){
          //Almacenar en el LocalStorage la info
          return this.saveLocalStorageResponse(resp);
        }else{
          return resp;
        }
      }),


      //TODO: Esto es realmente importante porque este error debajo me devuelve un observable que emite el error, y es por eso que en el componente se ejecuta next y no el error
      catchError((err: any) => {       
        return of(err);
      })
    );
  }
  saveLocalStorageResponse(resp: any) {
    if(resp.access_token && resp.user){
      localStorage.setItem("token", resp.access_token);
      localStorage.setItem("user", JSON.stringify(resp.user));
      this.user = resp.user;
      this.token = resp.access_token;
      return true;
    }
    return false;
  }

  registro(formulario: any){
    let url = URL_SERVICIOS+"/users/register";
    //El pipe hace que la respuesta llegue aca antes del componente
    return this.http.post(url, formulario);
  }

  logout(){
    this.user = null;
    this.token = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.router.navigate(["auth/login"]);
  }
}
