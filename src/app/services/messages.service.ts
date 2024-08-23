import { Injectable } from '@angular/core';
import { MessageService } from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private messageService: MessageService) {}


  popUpServces(mensaje : string) {
    this.messageService.add({
      severity: "error",
      summary: "Error",
      detail: mensaje,
    });
  }

}
