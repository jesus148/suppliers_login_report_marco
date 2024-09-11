import { Component, inject  } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { InputGroupModule } from 'primeng/inputgroup';
import { RouterLink } from '@angular/router';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { LoginService } from '../services/login.service';
import { CommonModule } from '@angular/common';
import { MessagesService } from '../services/messages.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { SpinnerComponent } from "../spinner/spinner/spinner.component";
import { SuppliersService } from '../services/suppliers.service';





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
    CommonModule,
    NgxSpinnerModule,
    SpinnerComponent
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessagesService]
})


export class LoginComponent {




  private loginService = inject(LoginService);
  // private messagesService = inject(MessagesService);




  username: string = '';
  password: string = '';


  showPass: boolean = false;
  // spinner cargador
  loading: boolean = false;


  // validar
  loginForm = new FormGroup({
    usuario: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)])
  });





  // CUANDO INCIA EL COMPONENTE
  constructor(
    private FormBuilder: FormBuilder, private router: Router,
    private primengConfig: PrimeNGConfig, private messageService: MessagesService,
    private spinner: NgxSpinnerService
    //agregar esto para las validaciones recordar importar
  ) {
  }
// inicia con e spinner
  ngOnInit(): void {
    if(this.loginService.islogedd){
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
      }, 2000);
    }
    this.spinner.hide();
  }







  // metodo ligin con sap
  login() {

    if (!this.loginForm.valid) {
      console.log(this.loginForm.valid);
      console.log("error test")
      return this.messageService.popUpServces('error', 'Error', 'complete los datos correctamente');
    }


    const cardCode = this.loginForm.controls['usuario'].value!.trim();
    const password = this.loginForm.controls['password'].value!.trim();


    this.loading = true;


        /** spinner starts on init */
        this.spinner.show();

        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 2000);



    this.loginService.loginSap(cardCode, password).subscribe({

      // usando propiedades del suscribe

      // todo ok , obtenemos el response del back
      next: (resp: any) => {

        // llenando la data del service
        this.loginService.usuario = resp.rows;
        this.loginService.islogedd = true;
        this.loginService.CardCodeData = cardCode;



        // veririca para redirgirse
        this.router.navigateByUrl('SupliersList');

        // console.log(resp.rows);

        // almacenando el token como objeto
        // convierte a string de json
        localStorage.setItem('object', JSON.stringify(resp.rows[0]));

        this.spinner.hide();
      },
      // cuando hay error , el error sea del servidor o un error desconocido
      error: (e: HttpErrorResponse) => {
        this.messageService.msjError(e);
        this.loading = false;
      }
    })









  }






  // metodo regresar
  updatePassword() {
    this.router.navigate(['/loginUpdate'])
  }








}
