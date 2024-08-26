import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { MessagesService } from '../../services/messages.service';
import { Supliers } from '../../interfaces/supliers.model';
import { CommonModule } from '@angular/common';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Observable, of } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { SpinnerComponent } from '../../spinner/spinner.component';

import { MegaMenuModule } from 'primeng/megamenu';
import { TabViewModule } from 'primeng/tabview';
import { SuppliersService } from '../../services/suppliers.service';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { style } from '@angular/animations';


@Component({
  selector: 'app-supliers',
  standalone: true,
  imports: [
// modulos para la vista de este componente
    MenubarModule,
    TableModule,
    CardModule,
    ChartModule,
    CommonModule,
    ButtonModule,
    FormsModule,
    DialogModule,
    InputGroupModule,
    InputGroupAddonModule,
    FormsModule, CommonModule, ReactiveFormsModule,
    SpinnerComponent,
    TabViewModule,
    MegaMenuModule,
    AvatarModule ,
    AvatarGroupModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './supliers.component.html',
  styleUrl: './supliers.component.css'
})
export class SupliersComponent implements OnInit{


  // private loginService = inject(LoginService);
  private messagesService = inject(MessagesService);





  // data estado de cuenta
  DataSupliers: any = [];

  // data cuenta banco
  dataSuppliersBanck : any =[ ];



  listSupliers: Supliers[] =[
    {
      serie:  13 , fecEmis : '45',fecve:  12, fecpro :  'jjsks' , moneda: 34 , total:  'jsks' , monto:23 ,
      fecEmisaldo :   'sting'
    }

  ]


  // carga iconos
  items : MenuItem[] | undefined;





  loading: boolean = false;
  totalRegistros?: number;

  showPaginator!: boolean;



//guarda la data de los inputs
prroveedor!: string | undefined;
// datos del usuario
usuario : any;
cardCode : any;

activeIndex : number = 0;







// modal acutalizar
modalBolean:boolean = false;
detailToShow : any;


// modalregistrarbanco
modalRegistrar:boolean = false;
btnRegistrarBanco:boolean = false;





          // array de bancos
          listaBancos: any = [
            { value: '001', name: 'BANCO CENTRAL DE RESERVA' },
            { value: '002', name: 'BANCO DE CREDITO DEL PERU' },
            { value: '003', name: 'INTERBANK' },
            { value: '004', name: 'BANCO INTERAMERICANO DE FINANZAS' },
            { value: '007', name: 'CITIBANK' },
            { value: '008', name: 'STANDARD CHARTERED' },
            { value: '009', name: 'BANCO SCOTIABANK' },
            { value: '011', name: 'BBVA' },
            { value: '018', name: 'BANCO DE LA NACION' },
            { value: '035', name: 'BANCO PICHINCHA' },
            { value: '038', name: 'BANBIF' },
            { value: '042', name: 'BANCO DEL LIBERTADOR' },
            { value: '043', name: 'BANCO DEL TRABAJO' },
            { value: '053', name: 'BANCO GNB' },
            { value: '056', name: 'BANCO SANTANDER' },
            { value: '803', name: 'CMAC AREQUIPA' }
        ];

        // tipos de cuentas
         accountType :any = [
          { value: 'A', name: 'Cuenta Ahorro' },
          { value: 'C', name: 'Cuenta Corriente' },
          { value: 'M', name: 'Cuenta Maestra' },
          { value: 'CI', name: 'Interbancaria/Cheque Gerencial' },
          { value: 'D', name: 'Detracción' }
      ];
      //divisas

 currency :any = [
  { value: 'USD', name: 'Dolar Americano' },
  { value: 'PEN', name: 'Soles' }
];








        // datos registrar banco
        bankCode? : string = '';
        accountNo? : string = '';
        divisas?: string =    '';
        bankAccountType?: string = '';












    // validar
    loginForm = new FormGroup({
      usuario: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)])
    });










  // inicia
  constructor( private loginService : LoginService ,  private router: Router , private suppliers : SuppliersService ,
    private formBuilder: FormBuilder
  ){


        // metodo get supliers
        this.listData();

        //metodo get account banck
        this.getDataAccountBanck();

  }
  // inicia
  ngOnInit(){
    // llama al pmenubar
    this.items=[
      {
        label:'Actualizar Contraseña', //titulo
        icon: 'pi pi-fw pi-user-edit',//icono
        // metodo salir sesion
        command:()=>{
          this.cargarModal();
        }
      },
      {
        label:'Salir', //titulo
        icon: 'pi pi-fw pi-power-off',//icono
        // metodo salir sesion
        command:()=>{
          this.loginService.logout();
        }
        // ,style: {'margin-left': '280px'}
      }
    ];

    // llama al metodo de suplliers
    this.listData();

    this.cargarUsuario();


  }









  // metodo registra la data
  listData(){

    const token = localStorage.getItem('object');

     const  data2= JSON.parse(localStorage.getItem('object') || '');




    if(token){

          this.loginService.getData(data2.CardCode).subscribe((resp:any) => {

      this.DataSupliers= resp.rows;

      this.loading = true;

    }, (err) => {
      // this.messagesService.showError(err.error.message);
    });
    }else{
      return console.log("false");
    }

    this.loginService.getData(data2.CardCode).subscribe((resp:any) => {

      this.DataSupliers= resp.rows;
      this.loading = true;

    }, (err) => {
      // this.messagesService.showError(err.error.message);
    });

    }





    getDataAccountBanck(){

      const token = localStorage.getItem('object');
      const  data2= JSON.parse(localStorage.getItem('object') || '');


    if(token){

      this.suppliers.getBankAccount(data2.CardCode).subscribe((resp:any) => {
        this.dataSuppliersBanck = resp.rows ;
        // console.log(this.dataSuppliersBanck);


    }, (err) => {
    //  this.messagesService.showError(err.error.message);
    });
    }else{
    return console.log("false");
    }



    }




    // cargar usuario datos del cliente
    cargarUsuario(){
      // obtiene el token
      const allObject = localStorage.getItem('object');
      // conviritendo de objeto a string
      const  data2= JSON.parse(allObject || '');
      this.usuario = data2.CardName ;
      this.cardCode = data2.CardCode ;
    }





    // MODAL ACTUALIZAR
    cargarModal(){
      this.modalBolean= true;
      const token = localStorage.getItem('object');
      const  data2= JSON.parse(localStorage.getItem('object') || '');
    }





    // actualizar contraseña
    restablecer(){

      if(!this.loginForm.valid){


      }

          // obteniendo la data
    const usuario = this.loginForm.controls['usuario'].value!.trim();
    const password = this.loginForm.controls['password'].value!.trim();



    // llama al servicio y le envia
    this.loginService.updatePassword(usuario, password).subscribe((resp:any) => {
      // localStorage.setItem('usuario', JSON.stringify(resp.usuario));


      console.log(resp);
      this.loginForm.reset();


    }, (err) => {
      // this.messagesService.showError(err.error.message);
      console.log(err);

    });

    }









    // registar banco
    registrarBank(){


      const bankCreate= {
        cardCode : this.cardCode,
        bankCode : this.bankCode,
        accountNo : this.accountNo,
        userCurrBank : this.divisas,
        bankAccountType : this.bankAccountType
      }


      console.log(bankCreate)
      this.suppliers.registerBanck(bankCreate).subscribe((resp : any)=>{
        this.messagesService.popUpServces(resp);
        // this.modalRegistrar = false;
        console.log(resp);
      },(error) =>{
        console.log(error);
        this.messagesService.popUpServces(error);
      });

    }



    mostrarModal(){
      this.modalRegistrar = true;
    }



















    }













