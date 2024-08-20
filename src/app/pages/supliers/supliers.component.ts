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
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

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
    FormsModule
  ],
  templateUrl: './supliers.component.html',
  styleUrl: './supliers.component.css'
})
export class SupliersComponent implements OnInit{


  // private loginService = inject(LoginService);
  private messagesService = inject(MessagesService);


  // const datos = [ ];




  // guarda la data
  data: any;




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

  DataSupliers: any = [];

  showPaginator!: boolean;



//guarda la data de los inputs
prroveedor!: string | undefined;









  // inicia
  constructor( private loginService : LoginService ,  private router: Router){


        // llama al metodo de suplliers
        this.listData();

  }
  // inicia
  ngOnInit(){
    // llama al pmenubar
    this.items=[
      {
        label:'Salir', //titulo
        icon: 'pi pi-fw pi-power-off',//icono
        // metodo salir sesion
        command:()=>{
          this.loginService.logout();
        },

      }
    ]

    // llama al metodo de suplliers
    this.listData();

  }









  // metodo registra la data
  listData(){


    const token = localStorage.getItem('coreData');

    if(token){

          this.loginService.getData(token).subscribe((resp:any) => {



      this.DataSupliers= resp.rows;

      this.loading = true;

      // veririca para redirgirse


    console.log("data");
        console.log(resp);

    }, (err) => {
      this.messagesService.showError(err.error.message);
    });
    }else{


    // metodo registrar
    this.loginService.getData(this.loginService.CardCodeData).subscribe((resp:any) => {



      this.DataSupliers= resp.rows;


      // veririca para redirgirse


    // console.log("data");
    //     console.log(resp);

    }, (err) => {
      this.messagesService.showError(err.error.message);
    });
    }

    }





    // METODOS REST




















    }













