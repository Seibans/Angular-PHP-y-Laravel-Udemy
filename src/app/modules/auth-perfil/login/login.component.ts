import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formLogin!: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, public router: Router){
    console.log("SOY EL CONSTRUCTOR");
  }
  
  ngOnInit(): void {
    this.crearForm();
    //TODO: Debes actualizar esta parte 
    if(this.authService.user && this.authService.token){
      this.router.navigate(["/"]);
    }
    console.log("ME EJECUTO DE NUEVO");
  }
  
  crearForm(){
    this.formLogin = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }
  
  onSubmit() {
    if (this.formLogin.valid) {
      this.authService.login(this.f["email"].value, this.f["password"].value).subscribe({
        next: (resp: any) => {
          console.log(resp);
          if(!resp.error && resp){
            document.location.reload();
          }else{
            if(resp.error.error == "Unauthorized" || resp.error.message == "Unauthenticated."){
              alert("ERROR CONTROLADO");
              return;
            }

          }
          console.log(resp);
        },
        error: (err) => {
        },
      });
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
  }
  
  get f() {
    return this.formLogin.controls;
  }
}
