import { Withholdings } from '../../interfaces/withholdings.model';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { SuppliersService } from '../../services/suppliers.service';
import { SpinnerComponent } from '../../spinner/spinner/spinner.component';
import { Router } from '@angular/router';
import { PayedInvoices } from '../../interfaces/PayedInvoices';
import { PaginatorModule } from 'primeng/paginator';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { MessagesService } from '../../services/messages.service';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { MegaMenuModule } from 'primeng/megamenu';
import { LoginService } from '../../services/login.service';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AutoCompleteModule } from 'primeng/autocomplete';
import {environmentPro} from '../../../environments/enviroment.prod';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-supliers',
  standalone: true,
  imports: [
    // modulos para la vista de este componente
    AutoCompleteModule,
    AvatarGroupModule,
    AvatarModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    ChartModule,
    CommonModule,
    CommonModule,
    DialogModule,
    FormsModule,
    FormsModule,
    FormsModule, CommonModule, ReactiveFormsModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputTextModule,
    MegaMenuModule,
    MenubarModule,
    NgxSpinnerModule,
    PaginatorModule,
    ReactiveFormsModule,
    SpinnerComponent,
    TableModule,
    TabViewModule,
    ToastModule,
  ],
  templateUrl: './supliers.component.html',
  styleUrl: './supliers.component.css',
  providers: [MessagesService
  ]
})
export class SupliersComponent implements OnInit {




  // data estado de cuenta
  DataSupliers: any = [];

  // data cuenta banco
  dataSuppliersBanck: any = [];

  //data tabla deducciones
  dataDeductionsBanck: any = [];

  // tabla retenciones data
  dataWithholdings: Withholdings[] = [];


  // data pagos efectuados
  dataPayinvoices:PayedInvoices[] = [];


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
  btnRetenciones: boolean = false;
  btnDeducciones: boolean = false;
  btnPagosEfectuados:boolean = false;
  btnEstadoCuenta:boolean=false;
  btnFirstCuenta:boolean = true;
  // banco
  // modalactualizar
  modalActualizar: boolean = false;


    // datos actualizarbanco
    bankCode2: any;
    accountNo2: any;
    userCurrBank2: any;
    bankAccountType2: any;
    index: any;


    // paginacion de estado cuenta
    paginatedData1: any[] = [];
    rows1: number = 10;
    totalRecords1: number = 0;


  // paginacion detracciones
  paginatedData: any[] = [];
  rows: number = 12;
  totalRecords: number = 0;

  // paginacion retenciones
  paginatedData2: any[] = [];
  rows2: number = 12;
  totalRecords2: number = 0;



  // paginacicion pagos efectuados
  paginatedData5: any[] = [];
  rows5: number = 12;
  totalRecords5: number = 0;



  //inputs fecha y btn para consultas y detracciones
  desde : Date| undefined;
  hasta:Date | undefined;
  btnActive:boolean=true;
  maxDate :Date;




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

  accountType2: any = [];
  //divisas

  currency: any = [
    { value: 'USD', name: 'Dolar Americano' },
    { value: 'PEN', name: 'Soles' }
  ];


  // datos registrar banco
  bankCode?: string = '';
  accountNo?: string = '';
  divisas?: string = '';
  bankAccountType?: string = '';
  //divisas registrar banco
  divisasBoolean: boolean = true;
  tiposCuentas: boolean = true;

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
  constructor(
    private loginService: LoginService,
    private router: Router,
    private suppliers: SuppliersService,
    private formBuilder: FormBuilder,
    private messageService: MessagesService,
    private spinner: NgxSpinnerService,
    private hhtpclient:HttpClient
  ) {

    // metodo get supliers
    this.listData();

    //metodo get account banck
    this.getDataAccountBanck();

    // data de deducciones
    this.getDataDeductions();

    // data retenciones
    this.getDataWithholdings();

    // dataa pagos efectuados
    this.getPagosEfectuados();

    this.maxDate= new Date();


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
        styleClass: 'estilos'
      },
      {
        label: 'Estado de Cuenta', //titulo
        icon: 'pi pi-file',//icono
        // metodo salir sesion
        command: () => {
          this.activeIndex = 0;
          this.btnRegistrarBanco = false;
          this.btnRetenciones = false;
          this.btnDeducciones = false;
        },
        styleClass: 'active'
      },
      {
        label: 'Detracciones', //titulo
        icon: 'pi pi-credit-card',//icono
        // metodo salir sesion
        command: () => {
          this.activeIndex = 2;
          this.btnRegistrarBanco = false;
          this.btnRetenciones = true;
          this.btnDeducciones = false;
        },
        styleClass: 'active'
      },
      {
        label: 'Retenciones', //titulo
        icon: 'pi pi-wallet',//icono
        // metodo salir sesion
        command: () => {
          this.activeIndex = 3;
          this.btnRegistrarBanco = false;
          this.btnRetenciones = false;
          this.btnDeducciones = true;
        },
        styleClass: 'active'
      },
      {
        label: 'Cuentas de banco', //titulo
        icon: 'pi pi-building-columns',//icono
        // metodo salir sesion
        command: () => {
          this.activeIndex = 6;
          this.btnRegistrarBanco = true;
          this.btnRetenciones = false;
          this.btnDeducciones = false;
        },
        styleClass: 'active'
      },
      {
        label: 'Pagos Efectuados', //titulo
        icon: 'pi pi-wallet',//icono
        // metodo salir sesion
        command: () => {
          this.activeIndex = 4;
          this.btnPagosEfectuados = true;
          this.btnRetenciones = false;
          this.btnDeducciones = false;
          this.btnRegistrarBanco = false;
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





  // ESTADO DE CUENTA
  // metodo registra la data
  listData() {

    const token = localStorage.getItem('object');
    const data2 = JSON.parse(localStorage.getItem('object') || '');
    this.loginService.getData(data2.CardCode).subscribe((resp: any) => {

      this.DataSupliers = resp.rows;
      this.loading = true;
      this.totalRecords1 = resp.rows.length;
      this.Paginator1({ first: 0, rows: this.rows1 });

    }, (err) => {
      // this.messagesService.showError(err.error.message);
    });

  }
  // metodo paginator s
  Paginator1(event: any): void {
        // event.first es el event rows actual
        const start = event.first;
        const end = event.first + event.rows;
        this.paginatedData1 = this.DataSupliers.slice(start, end);
  }
  getDownloadXlsStateCount(){
    this.suppliers.DownloadXlsStateCount( this.DataSupliers).subscribe((data:any)=>{
      window.open(data.publicPath,'_blank')
    },(error)=>{
      console.log(error);
    })

  }











  // cargar usuario datos del cliente
  cargarUsuario() {
    // obtiene el token
    const allObject = localStorage.getItem('object');
    // JSON.parse :analiza una cadena JSON y construye el valor u objeto de JavaScript descrito por la cadena.
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
      return this.messageService.popUpServces('error', 'Error', 'complete los datos por favor');
    }

    this.spinner.show();
    // obteniendo la data
    const usuario = this.loginForm.controls['usuario'].value!.trim();
    const password = this.loginForm.controls['password'].value!.trim();

    // llama al servicio y le envia
    this.loginService.updatePassword(usuario, password).subscribe((resp: any) => {

      this.messageService.msjSuccees("Contraseña actualizada correctamente.");
      this.loginForm.reset();
      this.modalBolean = false;
      this.spinner.hide();
    }, (err) => {
      this.messageService.msjError(err);
      this.spinner.hide();
      console.log(err);

    });

  }

  getDownloadXlsAccountState(){
    if(this.btnActive){
      this.hhtpclient.post( `${environmentPro.base_url}/deductions-report`, {rows:this.dataDeductionsBanck}).subscribe((data:any)=>{
        window.open(data.publicPath, '_blank');
      } , (error)=>{
        console.log(error);
      })
    }

    this.hhtpclient.post( `${environmentPro.base_url}/deductions-report`, {rows:this.paginatedData}).subscribe((data:any)=>{
      window.open(data.publicPath, '_blank');
    } , (error)=>{
      console.log(error);
    })

  }

















  // CUENTAS DE BANCO
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

  // registar banco
  registrarBank() {
    if (!this.registrarBanco.valid) {
      return this.messageService.popUpServces('error', 'Error', 'complete los datos');
    }
    const bankCreate = {
      cardCode: this.cardCode,
      bankCode: this.bankCode,
      accountNo: this.accountNo,
      userCurrBank: this.divisas,
      bankAccountType: this.bankAccountType
    }
    if(this.accountNo?.length !== 14 && bankCreate.bankCode  === '002' && bankCreate.bankAccountType === 'A' ){
      return this.messageService.warningMessage('la cuenta de ahorros para BCP debe contar 14 digitos ');
    }else if(this.accountNo?.length !== 13 && bankCreate.bankCode  === '002' && bankCreate.bankAccountType === 'C' ){
      return this.messageService.warningMessage('la cuenta de corriente para BCP debe contar 13 digitos ');
    }else if(this.accountNo?.length !== 20 && bankCreate.bankCode  === '002' && bankCreate.bankAccountType === 'CI' ){
      return this.messageService.warningMessage('la cuenta Interbancaria para BCP debe contar 20 digitos ');
    }else {

      this.spinner.show();

      this.suppliers.updateBanck2(bankCreate).subscribe((resp: any) => {
        this.getDataAccountBanck();
        this.messageService.popUpServces('success', 'Confirmación', 'Banco registrado correctamente');
        console.log(resp);
      }, (err) => {
        if (err.status === 200) {
          this.getDataAccountBanck();
          this.messageService.popUpServces('success', 'Confirmación', 'Banco registrado correctamente');
          this.registrarBanco.reset();
          this.modalRegistrar = false;
          setTimeout(() => {
            this.spinner.hide();
          }, 2000);

        } else {
          this.messageService.popUpServces('error', 'Error', 'Error al registrar el banco');
          this.registrarBanco.reset();
          this.modalRegistrar = false;
          this.getDataAccountBanck();
          setTimeout(() => {
            this.spinner.hide();
          }, 2000);

        }
      });
    }
  }
  mostrarModal() {
    this.modalRegistrar = true;
  }


  changeTypeCount() {
    if (this.bankCode === '002') {
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

      this.divisasBoolean = true;
      this.tiposCuentas = true;
    } else if (this.bankCode === '018') {


      this.accountType = [
        { value: 'M', name: 'Cuenta Detracción' }
      ]
      this.currency = [
        { value: 'PEN', name: 'Soles' }
      ]
      this.divisasBoolean = false;
      this.tiposCuentas = false;


    } else {

      this.divisasBoolean = true;
      this.tiposCuentas = true;
      this.accountType = [
        { value: 'A', name: 'Cuenta Ahorro' },
        { value: 'M', name: 'Cuenta Interbancaria' }
      ]
      this.currency = [
        { value: 'USD', name: 'Dolar Americano' },
        { value: 'PEN', name: 'Soles' }
      ];
    }
  }


  cancel() {
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
    this.accountNo = '';
    this.divisas = '';
    this.bankAccountType = '';
  }
  public invitationMap = {
    '001': 'BANCO CENTRAL DE RESERVA',
    '002': 'BANCO DE CREDITO DEL PERU',
    '003': 'INTERBANK',
    '004': 'BANCO INTERAMERICANO DE FINANZAS',
    '007': 'CITIBANK',
    '008': 'STANDARD CHARTERED',
    '009': 'BANCO SCOTIABANK',
    '011': 'BBVA',
    '018': 'BANCO DE LA NACION',
    '035': 'BANCO PICHINCHA',
    '038': 'BANBIF',
    '042': 'BANCO DEL LIBERTADOR',
    '043': 'BANCO DEL TRABAJO',
    '053': 'BANCO GNB',
    '056': 'BANCO SANTANDER',
    '803': 'CMAC AREQUIPA'
  }














  // listar pagos efectuados
  getPagosEfectuados() {
    const data2 = JSON.parse(localStorage.getItem('object') || '');

    this.suppliers.getPayedInvoices(data2.CardCode).subscribe((resp: any) => {
      this.dataPayinvoices = resp.rows;
      this.loading = true;
      this.totalRecords5 = resp.rows.length;
      this.PaginatorPay({ first: 0, rows: this.rows5 });
    }, (err) => {
      // this.messagesService.showError(err.error.message);
    });
  }

    // metodo paginator
    PaginatorPay(event: any): void {
      // event.first es el event rows actual
      const start = event.first;
      const end = event.first + event.rows;
      this.paginatedData5 = this.dataPayinvoices.slice(start, end);
    }

    getDownloadXslsPaymentsMade(){
      const url = `${environmentPro.base_url}/payed-invoices-report?cardCode=${this.cardCode}`;
      window.open(url, '_blank');
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
      return this.messageService.popUpServces('error', 'Error', 'complete los datos');
    }
    const updateBank = {
      cardCode: this.cardCode,
      bankCode: this.bankCode2,
      accountNo: this.accountNo2,
      userCurrBank: this.userCurrBank2,
      bankAccountType: this.bankAccountType2,
      index: this.index
    }

    if(this.accountNo?.length !== 14 && updateBank.bankCode  === '002' && updateBank.bankAccountType === 'A' ){
      return this.messageService.warningMessage('la cuenta de ahorros para BCP debe contar 14 digitos ');
    }else if(this.accountNo?.length !== 13 && updateBank.bankCode  === '002' && updateBank.bankAccountType === 'C' ){
      return this.messageService.warningMessage('la cuenta de corriente para BCP debe contar 13 digitos ');
    }else if(this.accountNo?.length !== 20 && updateBank.bankCode === '002' && updateBank.bankAccountType === 'CI' ){
      return this.messageService.warningMessage('la cuenta Interbancaria para BCP debe contar 20 digitos ');
    }else {

      this.spinner.show();

      this.suppliers.updateBanck2(updateBank).subscribe((resp: any) => {


        this.messageService.popUpServces('info', 'Error', "Banco actualizado.");
        setTimeout(() => {
          this.spinner.hide();
        }, 2000);

      }, (error) => {
        console.log(error);
        this.messageService.popUpServces('success', 'Confirmación', "Banco actualizado correctamente.");
        this.modalActualizar = false;
        setTimeout(() => {
          this.spinner.hide();
        }, 2000);


        this.bankCode2 = '';
        this.accountNo2 = '';
        this.userCurrBank2 = '';
        this.bankAccountType2 = '';
        this.index = '';

        this.getDataAccountBanck()

      });
    }
  }
  changeTypeCount2() {
    if (this.bankCode2 === '002') {
      this.accountType = [
        { value: 'A', name: 'Cuenta Ahorro' },
        { value: 'C', name: 'Cuenta Corriente' },
        { value: 'M', name: 'Cuenta Maestra' },
        { value: 'CI', name: 'Interbancaria/Cheque Gerencial' }
      ];
      this.currency = [
        { value: 'USD', name: 'Dolar Americano' },
        { value: 'PEN', name: 'Soles' }
      ]
    } else if (this.bankCode2 === '018') {

      this.accountType = [
        { value: 'D', name: 'Cuenta Detracción' }
      ]
      this.currency = [
        { value: 'PEN', name: 'Soles' }
      ]

    } else {
      this.accountType = [
        { value: 'C', name: 'Cuenta Corriente' },
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

  async donwoladPdf(cardCode: string , withholdingNumnber : string){
    try {
    const url = `http://52.207.189.125:3000/withholdings-with-filters?cardCode=${cardCode}&&withholdingNumnber=${withholdingNumnber}`;
    window.open(url, '_blank');
    } catch (error) {
      console.log(error)
    }
  }

  DownloadXlsWithholdings(){
    const url = `${environmentPro.base_url}/withholdings-report?cardCode=${this.cardCode}`;
    window.open(url, '_blank');
  }






















  // data de la detracciones=====
  getDataDeductions() {
    const token = localStorage.getItem('object');
    const data2 = JSON.parse(localStorage.getItem('object') || '');

    this.btnActive === false? this.btnActive=true: this.btnActive=true ;

    if (token) {
      this.suppliers.getDeductions(data2.CardCode).subscribe((resp: any) => {
        this.dataDeductionsBanck = resp.rows;
        this.totalRecords = resp.rows.length;
        this.Paginator({ first: 0, rows: this.rows });
      }, (err) => {
        this.messageService.msjError(err);
      });
    } else {
      return console.log("no existe token");
    }


  }
  // metodo paginator
  Paginator(event: any): void {
    // event.first es el event rows actual
    const start = event.first;
    const end = event.first + event.rows;
    this.paginatedData = this.dataDeductionsBanck.slice(start, end);
  }

  paginatorMovildetrac(event:any):void{
    const start=event.first;
    const end= event.first + event.rows;
    this.paginatedData = this.dataDeductionsBanck.slice(start, end);
  }

  search(){
    if(!this.desde || !this.hasta){
      return this.messageService.warningMessage('Ingrese las Fechas Necesarias')
    }

    const desdeformato = this.formatDate(this.desde);
    const hastaformato = this.formatDate(this.hasta);

    this.suppliers.getDateDedductiones(this.cardCode,desdeformato , hastaformato).subscribe((data:any)=>{

      if(data.rows.length === 0){
        this.messageService.popUpServces('warn' ,'Error','No se encontraron datos en la tabla');
        this.getDataDeductions();
        this.clearInputs();
        return
      }

      this.dataDeductionsBanck = data.rows;
      this.totalRecords = data.rows.length;
      this.Paginator({ first: 0, rows: this.rows });
      this.clearInputs();
      this.btnActive=false;
    })

  }


  formatDate(date:Date){
    let dia= `${date.getDate()}`;
    dia = (dia.length === 1)? `0${dia}`:dia;

    // mes inicia por index 0 entonces se suma
    let mes= `${date.getMonth() + 1}`;
    mes= (mes.length === 1)? `0${mes}`:mes;

    let año = `${ date.getFullYear()}`
    return `${año}${mes}${dia}`
  }


  clearInputs(){
    this.desde= undefined;
    this.hasta=undefined;
  }

  getDownloadXlsdetraccions(){
    // const url = `${environmentPro.base_url}/deductions-report?cardCode=${this.cardCode}`;
    // window.open(url, '_blank');

    if(this.btnActive){
      this.hhtpclient.post( `${environmentPro.base_url}/deductions-report`, {rows:this.dataDeductionsBanck}).subscribe((data:any)=>{
        window.open(data.publicPath, '_blank');
      } , (error)=>{
        console.log(error);
      })
    }

    this.hhtpclient.post( `${environmentPro.base_url}/deductions-report`, {rows:this.paginatedData}).subscribe((data:any)=>{
      window.open(data.publicPath, '_blank');
    } , (error)=>{
      console.log(error);
    })

  }








}




















