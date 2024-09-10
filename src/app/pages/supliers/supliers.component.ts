import { Component, OnInit } from '@angular/core';
import {  MenuItem } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { MessagesService } from '../../services/messages.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { MegaMenuModule } from 'primeng/megamenu';
import { TabViewModule } from 'primeng/tabview';
import { SuppliersService } from '../../services/suppliers.service';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ToastModule } from 'primeng/toast';
import { Withholdings } from '../../interfaces/withholdings.model';
import { PaginatorModule } from 'primeng/paginator';
import { PageEvent } from '../../interfaces/PageEvent';





@Component({
  selector: 'app-supliers',
  standalone: true,
  imports: [
    // modulos para la vista de este componente
    MenubarModule,
    ToastModule,
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
    TabViewModule,
    MegaMenuModule,
    AvatarModule,
    AvatarGroupModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    PaginatorModule
  ],
  templateUrl: './supliers.component.html',
  styleUrl: './supliers.component.css',
  providers: [MessagesService
  ]
})
export class SupliersComponent implements OnInit {


  // private loginService = inject(LoginService);
  // private messagesService = inject(MessagesService);





  // data estado de cuenta
  DataSupliers: any = [];

  // data cuenta banco
  dataSuppliersBanck: any = [];

  //data tabla deducciones
  dataDeductionsBanck: any = [];

  // tabla retenciones data
  dataWithholdings:Withholdings[] =[];









  // carga iconos
  items: MenuItem[] | undefined;






  loading: boolean = false;
  totalRegistros?: number;

  showPaginator!: boolean;



  //guarda la data de los inputs
  prroveedor!: string | undefined;
  // datos del usuario
  usuario: any;
  cardCode: any;

  activeIndex: number = 0;







  // modal acutalizar
  modalBolean: boolean = false;
  detailToShow: any;


  // titulos segun tablas
  modalRegistrar: boolean = false;
  btnRegistrarBanco: boolean = false;
  btnRetenciones:boolean = false ;
  btnDeducciones:boolean = false ;






  // banco
  // modalactualizar
  modalActualizar: boolean = false;


  // datos actualizarbanco
  bankCode2: any;
  accountNo2: any;
  userCurrBank2: any;
  bankAccountType2: any;
  index: any;






  // paginacion detracciones
  paginatedData: any[] = [];
  rows: number = 12;
  totalRecords: number = 0;

  // paginacion retenciones
  paginatedData2:any[] = [];
  rows2: number = 12;
  totalRecords2: number = 0;








  // array de bancosz
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
  accountType: any = [
    { value: 'A', name: 'Cuenta Ahorro' },
    { value: 'C', name: 'Cuenta Corriente' },
    { value: 'M', name: 'Cuenta Maestra' },
    { value: 'CI', name: 'Interbancaria/Cheque Gerencial' },
    { value: 'D', name: 'Detracción' }
  ];

  accountType2: any =[];
  //divisas

  currency: any = [
    { value: 'USD', name: 'Dolar Americano' },
    { value: 'PEN', name: 'Soles' }
  ];









  // datos registrar banco
  bankCode?: string ='';
  accountNo?: string ='';
  divisas?: string ='';
  bankAccountType?:string='';
  //divisas registrar banco
  divisasBoolean:boolean=true;
  tiposCuentas:boolean=true;











  // validar actualizar contraseña
  loginForm = new FormGroup({
    usuario: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)])
  });




  // valida registrar banco
  registrarBanco = new FormGroup({
    bancos: new FormControl('', [Validators.required]),
    numCuenta: new FormControl('', [Validators.required, Validators.minLength(3)]),
    divisas: new FormControl('', [Validators.required]),
    tipoCuentas: new FormControl('', [Validators.required])
  });



  // modal actualizar banco
  actualizarBanco = new FormGroup({
    bancos: new FormControl('', [Validators.required]),
    accountNo: new FormControl('', [Validators.required, Validators.minLength(3)]),
    divisas: new FormControl('', [Validators.required]),
    tipoCuentas: new FormControl('', [Validators.required]),

  })











  // inicia
  constructor(private loginService: LoginService, private router: Router, private suppliers: SuppliersService,
    private formBuilder: FormBuilder,
    private messageService: MessagesService
  ) {


    // metodo get supliers
    this.listData();

    //metodo get account banck
    this.getDataAccountBanck();

    // data de deducciones
    this.getDataDeductions();

    // data retenciones
    this.getDataWithholdings();

  }
  // inicia
  ngOnInit() {
    // llama al pmenubar
    this.items = [
      {
        label: 'Actualizar Contraseña', //titulo
        icon: 'pi pi-fw pi-user-edit',//icono
        // metodo salir sesion
        command: () => {
          this.cargarModal();
        },
        styleClass:'estilos'
      },
      {
        label: 'Estado de Cuenta', //titulo
        icon: 'pi pi-file',//icono
        // metodo salir sesion
        command: () => {
          this.activeIndex=0;
           this.btnRegistrarBanco=false;
          this.btnRetenciones= false;
          this.btnDeducciones = false;
        },
        styleClass: 'active'
      },
      {
        label: 'Detracciones', //titulo
        icon: 'pi pi-credit-card',//icono
        // metodo salir sesion
        command: () => {
          this.activeIndex=2;
          this.btnRegistrarBanco=false;
          this.btnRetenciones=true;
          this.btnDeducciones =false;
        },
        styleClass: 'active'
      },
      {
        label: 'Retenciones', //titulo
        icon: 'pi pi-wallet',//icono
        // metodo salir sesion
        command: () => {
          this.activeIndex=3 ;
          this.btnRegistrarBanco=false;
          this.btnRetenciones=false;
          this.btnDeducciones=true;
        },
        styleClass: 'active'
      },
      {
        label: 'Cuentas de banco', //titulo
        icon: 'pi pi-building-columns',//icono
        // metodo salir sesion
        command: () => {
          this.activeIndex=1 ;
          this.btnRegistrarBanco= true;
          this.btnRetenciones=false;
          this.btnDeducciones=false;
        },
        styleClass: 'active'
      },
      {
        label: 'Salir', //titulo
        icon: 'pi pi-fw pi-power-off',//icono
        // metodo salir sesion
        command: () => {
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
  listData() {

    const token = localStorage.getItem('object');
    const data2 = JSON.parse(localStorage.getItem('object') || '');

    if (token) {

      this.loginService.getData(data2.CardCode).subscribe((resp: any) => {

        this.DataSupliers = resp.rows;

        this.loading = true;

      }, (err) => {
        // this.messagesService.showError(err.error.message);
      });
    } else {
      return console.log("false");
    }

    this.loginService.getData(data2.CardCode).subscribe((resp: any) => {

      this.DataSupliers = resp.rows;
      this.loading = true;

    }, (err) => {
      // this.messagesService.showError(err.error.message);
    });

  }





  getDataAccountBanck() {

    const token = localStorage.getItem('object');
    const data2 = JSON.parse(localStorage.getItem('object') || '');


    if (token) {

      this.suppliers.getBankAccount(data2.CardCode).subscribe((resp: any) => {
        this.dataSuppliersBanck = resp.rows;



      }, (err) => {
        //  this.messagesService.showError(err.error.message);
      });
    } else {
      return console.log("false");
    }

  }




  // cargar usuario datos del cliente
  cargarUsuario() {
    // obtiene el token
    const allObject = localStorage.getItem('object');
    // conviritendo de objeto a string
    const data2 = JSON.parse(allObject || '');
    this.usuario = data2.CardName;
    this.cardCode = data2.CardCode;
  }





  // MODAL ACTUALIZAR
  cargarModal() {
    this.modalBolean = true;
    const token = localStorage.getItem('object');
    const data2 = JSON.parse(localStorage.getItem('object') || '');
  }

  // actualizar contraseña
  restablecer() {

    if (!this.loginForm.valid) {
      return this.messageService.popUpServces('error' , 'Error',  'complete los datos por favor');
    }
    // obteniendo la data
    const usuario = this.loginForm.controls['usuario'].value!.trim();
    const password = this.loginForm.controls['password'].value!.trim();

    // llama al servicio y le envia
    this.loginService.updatePassword(usuario, password).subscribe((resp: any) => {

      this.messageService.msjSuccees("cliente actualizado");
      this.loginForm.reset();
      this.modalBolean = false;
    }, (err) => {
      this.messageService.msjError(err);
      console.log(err);

    });

  }









  // registar banco
  registrarBank() {
    if (!this.registrarBanco.valid) {
      return this.messageService.popUpServces('error', 'Error',  'complete los datos');
    }
    const bankCreate = {
      cardCode: this.cardCode,
      bankCode: this.bankCode,
      accountNo: this.accountNo,
      userCurrBank: this.divisas,
      bankAccountType: this.bankAccountType
    }
      if(this.accountNo?.length !== 14 && this.bankAccountType === 'A'){
        return this.messageService.warningMessage('el numero de cuentas para ahorros debe tener 14 digitos');
      }else if( this.accountNo?.length !== 13 && this.bankAccountType ===  'C' ){
        this.messageService.warningMessage('el numero de cuenta debe tener 13 digitos');
      }else if(this.accountNo?.length !== 20 && this.bankAccountType ===  'CI'){
        this.messageService.warningMessage('el n° cuenta para el tipo de cuenta CI debe tener 20 digitos')
      }else{

           this.suppliers.updateBanck2(bankCreate).subscribe((resp: any) => {


             this.getDataAccountBanck();
             this.messageService.popUpServces('success', 'Confirmación' ,'Banco registrado correctamente');
             console.log(resp);
            },(err) => {
              if(err.status === 200) {
                this.getDataAccountBanck();
                this.messageService.popUpServces('success', 'Confirmación' ,'Banco registrado correctamente');
                this.registrarBanco.reset();
                this.modalRegistrar=false;
              }else{
                this.messageService.popUpServces('error', 'Error' ,'Error al registrar el banco');
                this.registrarBanco.reset();
                this.modalRegistrar=false;
                this.getDataAccountBanck();
              }
            });
      }
  }
  mostrarModal() {
    this.modalRegistrar = true;
  }
  changeTypeCount(){
    if(this.bankCode ===  '002') {
      this.accountType = [
        { value: 'A', name: 'Cuenta Ahorro' },
        { value: 'C', name: 'Cuenta Corriente' },
        { value: 'M', name: 'Cuenta Maestra' },
        { value: 'CI', name: 'Interbancaria/Cheque Gerencial' }
      ];

      this.currency = [
        { value: 'USD', name: 'Dolar Americano' },
        { value: 'PEN', name: 'Soles' }
      ];

      this.divisasBoolean=true;
      this.tiposCuentas = true;
    }else if(this.bankCode ===  '018'){


      this.accountType=[
        { value: 'M', name: 'Cuenta Detracción' }
      ]
      this.currency=[
        { value: 'PEN', name: 'Soles' }
      ]
      this.divisasBoolean=false;
      this.tiposCuentas = false;


    }else{

      this.divisasBoolean = true;
      this.tiposCuentas = true;
      this.accountType =[
        { value: 'A', name: 'Cuenta Ahorro' },
        { value: 'M', name: 'Cuenta Interbancaria' }
      ]
      this.currency = [
        { value: 'USD', name: 'Dolar Americano' },
        { value: 'PEN', name: 'Soles' }
      ];
    }
  }
  cancel(){
    this.accountType = [
      { value: 'A', name: 'Cuenta Ahorro' },
      { value: 'C', name: 'Cuenta Corriente' },
      { value: 'M', name: 'Cuenta Maestra' },
      { value: 'CI', name: 'Interbancaria/Cheque Gerencial' },
      { value: 'D', name: 'Detracción' }
    ];


    this.currency = [
      { value: 'USD', name: 'Dolar Americano' },
      { value: 'PEN', name: 'Soles' }
    ];



    this.bankCode = '';
    this.accountNo =  '';
    this.divisas =  '' ;
    this.bankAccountType= '';

  }






















  // Modal Banco actualiza
  modalBanco(obj: any, index: number) {
    this.modalActualizar = true;
    // seteando la data
    this.bankCode2 = obj.Codigo_Banco;
    this.accountNo2 = obj.Cuenta;
    this.userCurrBank2 = obj.Moneda_Banco;
    this.bankAccountType2 = obj.Tipo_Cuenta;
    this.index = index;

    console.log(this.bankCode2);
    this.changeTypeCount2();
  }


  // metodo acutalizar banco
  ActualizarBank() {
    if (!this.actualizarBanco.valid) {
      return this.messageService.popUpServces('error', 'Error' ,'complete los datos');
    }
    const updateBank = {
      cardCode: this.cardCode,
      bankCode: this.bankCode2,
      accountNo: this.accountNo2,
      userCurrBank: this.userCurrBank2,
      bankAccountType: this.bankAccountType2,
      index: this.index
    }

    if(updateBank.accountNo.length !== 14 && updateBank.bankAccountType ===  'A' ){
      return this.messageService.warningMessage('el  numero de cuenta para ahorrros debe tener 14 digitos');
    }else if(updateBank.accountNo.length !== 13 && updateBank.bankAccountType  === 'C'){
      return this.messageService.warningMessage('el numero de cuenta para la cuenta corriente debe tener 13 digitos')
    }else if(updateBank.accountNo.length !== 20 && updateBank.bankAccountType === 'CI'){
      return this.messageService.warningMessage('el n° cuenta para el tipo de cuenta CI debe tener 20 digitos');
    }else if(updateBank.bankCode ===  '002' && ( updateBank.bankAccountType !==   'A' || updateBank.bankAccountType !==   'M')){
      return this.messageService.warningMessage('la cuenta maestra y de ahorros solo aplica para el BCP');
    }else{
          this.suppliers.updateBanck2(updateBank).subscribe((resp: any) => {


            this.messageService.popUpServces('info', 'Error', "banco actualizado");

          }, (error) => {
            console.log(error);
            this.messageService.popUpServces('success', 'Confirmación', "banco actualizado correctamente");
            this.modalActualizar = false;


            this.bankCode2 =   '';
            this.accountNo2 =  '';
            this.userCurrBank2 =  '';
            this.bankAccountType2 = '';
            this.index= '';

            this.getDataAccountBanck()

          });
    }
  }
  changeTypeCount2(){
    if(this.bankCode2 ===  '002') {
      this.accountType = [
        { value: 'A', name: 'Cuenta Ahorro' },
        { value: 'C', name: 'Cuenta Corriente' },
        { value: 'M', name: 'Cuenta Maestra' },
        { value: 'CI', name: 'Interbancaria/Cheque Gerencial' }
      ];

      this.currency=[
        { value: 'USD', name: 'Dolar Americano' },
        { value: 'PEN', name: 'Soles' }
      ]
    }else if(this.bankCode2 ===  '018'){

      this.accountType=[
        { value: 'M', name: 'Cuenta Detracción' }
      ]
      this.currency=[
        { value: 'PEN', name: 'Soles' }
      ]

    }else{
      this.accountType =[
        { value: 'A', name: 'Cuenta Ahorro' },
        { value: 'M', name: 'Cuenta Interbancaria' }
      ]
      this.currency = [
        { value: 'USD', name: 'Dolar Americano' },
        { value: 'PEN', name: 'Soles' }
      ];
    }
    console.log(this.accountType)

  }











  // data de la retenciones
  getDataWithholdings() {

    const token = localStorage.getItem('object');
    const data2 = JSON.parse(localStorage.getItem('object') || '');

    if (token) {

      this.suppliers.getWithholdings(data2.CardCode).subscribe((resp: any) => {
        this.dataWithholdings = resp.rows;

        this.totalRecords2 = resp.rows.length;

        this.Paginator2({ first: 0, rows: this.rows });

      }, (err) => {

        console.log(err);
        this.messageService.msjError(err);


      });
    }
  }

  // metodo paginator
  Paginator2(event: any): void {

    // event.first es el event rows actual
    const start = event.first;
    const end = event.first + event.rows;
    this.paginatedData2 = this.dataWithholdings.slice(start, end);

  }














  // data de la detracciones
  getDataDeductions() {

    const token = localStorage.getItem('object');
    const data2 = JSON.parse(localStorage.getItem('object') || '');


    if (token) {

      this.suppliers.getDeductions(data2.CardCode).subscribe((resp: any) => {
        this.dataDeductionsBanck = resp.rows;
        this.totalRecords = resp.rows.length;
        this.Paginator({ first: 0, rows: this.rows });


      }, (err) => {
        this.messageService.msjError(err);
      });
    } else {
      return console.log("false");
    }

  }

  // metodo paginator
    Paginator(event: any): void {

      // event.first es el event rows actual
      const start = event.first;
      const end = event.first + event.rows;
      this.paginatedData = this.dataDeductionsBanck.slice(start, end);

    }






  }




















