import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  formRegistro!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.crearForm();
  }

  crearForm() {
    this.formRegistro = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      password_confirmation: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      type_user: new FormControl(1,Validators.required),
      state: new FormControl(1)
    }, { validators: this.matchingPasswordsValidator });
  }

  // matchingPasswordsValidator: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
  //   const passwordControl = control.get('password');
  //   const confirmPasswordControl = control.get('password_confirmation');
  //   if (!passwordControl || !confirmPasswordControl) {
  //     return null;
  //   }
  //   const password = passwordControl.value;
  //   const confirmPassword = confirmPasswordControl.value;
  //   return password === confirmPassword ? null : { mismatch: true };
  // };

  matchingPasswordsValidator: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null =>
  control.get('password')?.value === control.get('password_confirmation')?.value ? null : { mismatch: true };


  onSubmit() {
    if (this.formRegistro.valid) {

      this.authService.registro(this.formRegistro.value).subscribe({
        next: (resp: any) => {
          console.log(resp);
          this.router.navigate(["/auth/login"]);
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          // Aquí puedes realizar acciones adicionales si es necesario
        }
      });
    }
  }

  get f() {
    return this.formRegistro.controls;
  }
}
