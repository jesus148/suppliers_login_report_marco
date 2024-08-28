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
import {  PrimeNGConfig } from 'primeng/api';
import { LoginService } from '../services/login.service';
import { CommonModule, IMAGE_CONFIG } from '@angular/common';
import { MessagesService } from '../services/messages.service';
import { Token } from '@angular/compiler';
import { HttpErrorResponse } from '@angular/common/http';





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
    CheckboxModule,
    CommonModule
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessagesService]
})


export class LoginComponent {




  private loginService = inject(LoginService);
  // private messagesService = inject(MessagesService);




  username: string =  '';
  password: string =  '';

  showPass: boolean = false;


  loading: boolean = false;


    // validar
    loginForm = new FormGroup({
      usuario: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)])
    });





  // CUANDO INCIA EL COMPONENTE
  constructor(
    private FormBuilder: FormBuilder ,   private router: Router,
    private primengConfig: PrimeNGConfig , private messageService: MessagesService
    //agregar esto para las validaciones recordar importar
  ) {

  }


  ngOnInit(): void {
  }







  // metodo ligin con sap
  login(){

    if(!this.loginForm.valid){
      console.log(this.loginForm.valid);
      console.log("error test")
      return this.messageService.popUpServces('complete los datos correctamente');
    }


    const cardCode = this.loginForm.controls['usuario'].value!.trim();
    const password = this.loginForm.controls['password'].value!.trim();


    this.loading = true;



    // // metodo registrar
    // this.loginService.loginSap(cardCode, password).subscribe((resp:any) => {
    //   // llenando la data del service
    //   this.loginService.usuario = resp.rows;
    //   this.loginService.islogedd = true;
    //   this.loginService.CardCodeData = cardCode;
    //   console.log("kslds");
    //   // veririca para redirgirse
    //     this.router.navigateByUrl('SupliersList');
    //     // console.log(resp.rows);
    //     // almacenando el token como objeto
    //     // convierte a string de json
    //     localStorage.setItem(  'object' , JSON.stringify(resp.rows[0]));
    // }, (err) => {
    //   // return this.messageService.warningMessage('Usuario no encontrado');
    //   console.log(err);
    // });





    this.loginService.loginSap(cardCode , password).subscribe({

      // usando propiedades del suscribe

      // todo ok , obtenemos el response del back
      next :(resp :any) =>{

      // llenando la data del service
      this.loginService.usuario = resp.rows;
      this.loginService.islogedd = true;
      this.loginService.CardCodeData = cardCode;



      // veririca para redirgirse
        this.router.navigateByUrl('SupliersList');

        // console.log(resp.rows);

        // almacenando el token como objeto
        // convierte a string de json
        localStorage.setItem(  'object' , JSON.stringify(resp.rows[0]));
      },
      // cuando hay error , el error sea del servidor o un error desconocido
      error:(e : HttpErrorResponse)=>{
         this.messageService.msjError( e);
         this.loading=false;
      }
    })









  }






  // metodo regresar
  updatePassword(){
    this.router.navigate(['/loginUpdate'])
  }








}
