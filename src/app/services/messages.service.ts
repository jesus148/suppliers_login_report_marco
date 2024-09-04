import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private messageService: MessageService) {}






  // mensaje
  popUpServces(severity: string, summary: string, mensaje : string, ) {
    this.messageService.add({
      severity,
      summary,
      detail: mensaje,
      life:4000
    });
  }




  // mensaje de adevertencia
    warningMessage( mensaje: string) {
    this.messageService.add({
      severity: "warn",
      summary: "Advertencia",
      detail: mensaje,
    });
  }






  // mensaje confirmacion
  msjSuccees(message: string){
    this.messageService.add({severity:'success' , summary:'Success' ,detail:  message});
  }





  msjError( e: HttpErrorResponse){
    // verificando si el backen me responde algo o en todo el servidor o backend esta funcionando
    if(e.error.message){
      // msg : = en el backend
        console.log(e.error.message );
        // mostrando al usuario
        this.messageService.add({severity:"warn" , summary:"Warning" , detail: e.error.message});

        // si es un error desconocido osea el servidor o el backend no devuelve nada o no estan disponibles
      }else{
        this.messageService.add({severity:"warn" , summary:"Warining", detail:e.error.message})
      }

}







}
