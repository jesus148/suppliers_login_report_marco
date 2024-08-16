import { Component, inject } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { InputGroupModule } from 'primeng/inputgroup';
import { RouterLink } from '@angular/router';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule,FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { LoginService } from '../services/login.service';
import { CommonModule } from '@angular/common';
import { MessagesService } from '../services/messages.service';





@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule, CommonModule, ReactiveFormsModule,
    ReactiveFormsModule,
    DividerModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    CheckboxModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService]
})


export class LoginComponent {




  private loginService = inject(LoginService);
  private messagesService = inject(MessagesService);




  username: string =  '';
  password: string =  '';

  showPass: boolean = false;





    // validar
    loginForm = new FormGroup({
      usuario: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)])
    });





  // CUANDO INCIA EL COMPONENTE
  constructor(
    private FormBuilder: FormBuilder ,   private router: Router,
    private primengConfig: PrimeNGConfig
    //agregar esto para las validaciones recordar importar
  ) {

  }








  ngOnInit(): void {
  }






  // metodo para registrar sin el sap
  // login2() {


  //   // valida
  //   if(!this.loginForm.valid) {

  //     console.log(this.loginForm.valid);
  //     console.log("error test ");
  //     this.messagesService.showInfo('Complete correctamente el formulario de inicio de sesión');
  //     return;
  //   }

  //   // quitanto los espacios
  //   const usuario = this.loginForm.controls['usuario'].value!.trim();
  //   const password = this.loginForm.controls['password'].value!.trim();



  //   // metodo registrar
  //   this.loginService.logueo(usuario, password).subscribe((resp:any) => {


  //     localStorage.setItem('usuario', JSON.stringify(resp.usuario));
  //     // llenando la data del serivices
  //     this.loginService.usuario = resp.usuario;
  //     this.loginService.islogedd = true;
  //     /* this.router.navigate(['pages', 'home'], {queryParams: { p : 0}}); */

  //     // veririca para redirgirse
  //     if(resp.usuario.role === 'ADMIN') {
  //       this.router.navigateByUrl('loginUpdate');
  //     }
  //     if(resp.usuario.role === 'FINZ') {
  //       this.router.navigateByUrl('loginUpdate');
  //     }
  //   }, (err) => {
  //     this.messagesService.showError(err.error.message);
  //   });
  // }






  // metodo login con sap
  login(){



    if(!this.loginForm.valid){
      console.log(this.loginForm.valid);
      console.log("error test")
      this.messagesService.showInfo('complete correctamente el formulario');
    }




    const cardCode = this.loginForm.controls['usuario'].value!.trim();
    const password = this.loginForm.controls['password'].value!.trim();


    // metodo registrar
    this.loginService.loginSap(cardCode, password).subscribe((resp:any) => {



      // llenando la data del service
      this.loginService.usuario = resp.rows;
      this.loginService.islogedd = true;
      this.loginService.CardCodeData = cardCode;


      // veririca para redirgirse

        this.router.navigateByUrl('SupliersList');

        console.log(resp.rows)

    }, (err) => {
      this.messagesService.showError(err.error.message);
    });

  }







  // metodo regresar
  updatePassword(){


    this.router.navigate(['/loginUpdate'])

  }



}
