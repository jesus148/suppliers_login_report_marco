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



  // inicia
  constructor( private loginService : LoginService ,  private router: Router){



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


  }











  listData(){


    // metodo registrar
    this.loginService.getData(this.loginService.CardCodeData).subscribe((resp:any) => {



      // llenando la data del service
      this.loginService.usuario = resp.rows;
      this.loginService.islogedd = true;


      // veririca para redirgirse


        console.log(resp.rows)

    }, (err) => {
      this.messagesService.showError(err.error.message);
    });
    }












}
