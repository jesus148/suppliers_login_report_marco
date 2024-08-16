import { Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-supliers',
  standalone: true,
  imports: [
// modulos para la vista de este componente
    MenubarModule,
    TableModule,
    CardModule,
    ChartModule
  ],
  templateUrl: './supliers.component.html',
  styleUrl: './supliers.component.css'
})
export class SupliersComponent {


  // private loginService = inject(LoginService);
  private messagesService = inject(MessagesService);




  // guarda la data
  data: any;


  // carga iconos
  items : MenuItem[] | undefined;




  totalRegistros?: number;

  DataSupliers: any = [];

  showPaginator!: boolean;





  // inicia
  constructor( private loginService : LoginService ,  private router: Router){


        // llama al metodo de suplliers
        this.listData();

  }


  // inicia
  ngOnInit(){
    this.items=[
      {
        label:'Salir',
        icon: 'pi pi-fw pi-power-off'
      },
      {

      }
    ]


    // llama al metodo de suplliers
    this.listData();

  }











  listData(){


    // metodo registrar
    this.loginService.getData(this.loginService.CardCodeData).subscribe((resp:any) => {



      this.DataSupliers= resp.rows;


      // veririca para redirgirse


    console.log("data");
        console.log(resp);

    }, (err) => {
      this.messagesService.showError(err.error.message);
    });
    }












}
