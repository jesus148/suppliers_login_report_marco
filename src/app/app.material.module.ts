
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MenuModule } from "primeng/menu";
import { MessageService } from 'primeng/api';
// ACA COLOCAMOS TODAS LAS IMPORTACIONES DE ANGULAR

import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from "primeng/messages";

@NgModule({
    exports:[

    ] ,

    imports:[
      ButtonModule,
      ToastModule,
      BrowserModule,
      BrowserAnimationsModule,
      MenuModule ,
      MessagesModule,

    ],
    providers: []


})
export class AppMaterialModule{

}
