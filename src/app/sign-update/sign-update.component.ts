import { Component, inject } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule,FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { MessagesService } from '../services/messages.service';
import { RouterLink } from '@angular/router';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-sign-update',
  standalone: true,
  imports: [
    FormsModule, CommonModule, ReactiveFormsModule,
    ReactiveFormsModule,
    DividerModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    CheckboxModule,
    RouterLink
  ],
  templateUrl: './sign-update.component.html',
  styleUrl: './sign-update.component.css',
  providers: [MessageService]
})


export class SignUpdateComponent {



  private messagesService = inject(MessagesService);
  private loginService = inject(LoginService);






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




  restablecer(){


    // obteniendo datas



    // obteniendo la data
    const usuario = this.loginForm.controls['usuario'].value!.trim();
    const password = this.loginForm.controls['password'].value!.trim();







    // llama al servicio y le envia
    this.loginService.updatePassword(usuario, password).subscribe((resp:any) => {
      // localStorage.setItem('usuario', JSON.stringify(resp.usuario));

      // se almcaena toda la data
      this.loginService.mensaje = resp.message;
      // this.loginService.islogedd = true;

      console.log(resp);


      if(this.loginService.mensaje){

        this.router.navigate(['/login'])
      }


    }, (err) => {
      // this.messagesService.showError(err.error.message);
      console.log(err);

    });
  }



  regresar(){
    this.router.navigate(['/login2'])
  }










}
